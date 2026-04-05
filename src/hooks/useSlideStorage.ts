/**
 * useSlideStorage — Persistência robusta para slides
 *
 * Camada 1: localStorage (instantâneo, nunca falha)
 * Camada 2: API POST → arquivo JSON no disco (backup + git)
 * Camada 3: Versionamento com histórico navegável
 */

import { useState, useCallback, useEffect, useRef } from "react";

const STORAGE_KEY = "bahtech-slide-overrides";
const VERSIONS_KEY = "bahtech-slide-versions";
const MAX_VERSIONS = 30;

export interface SlideState {
    slideOrder: number[];
    textOverrides: { [slideIndex: number]: { [field: string]: string } };
}

export interface SlideVersion {
    id: string;
    timestamp: number;
    label: string;
    state: SlideState;
}

// ─── Helpers ───────────────────────────────────────────────

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function loadFromLocalStorage(totalSlides: number): SlideState | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw) as SlideState;
        if (
            data &&
            Array.isArray(data.slideOrder) &&
            data.slideOrder.length === totalSlides &&
            data.textOverrides &&
            typeof data.textOverrides === "object"
        ) {
            return data;
        }
        return null;
    } catch {
        return null;
    }
}

function saveToLocalStorage(state: SlideState): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error("[useSlideStorage] localStorage write error:", e);
    }
}

function loadVersions(): SlideVersion[] {
    try {
        const raw = localStorage.getItem(VERSIONS_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as SlideVersion[];
    } catch {
        return [];
    }
}

function saveVersions(versions: SlideVersion[]): void {
    try {
        localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
    } catch (e) {
        console.error("[useSlideStorage] versions write error:", e);
    }
}

function pushVersion(label: string, state: SlideState): SlideVersion[] {
    const versions = loadVersions();
    const newVersion: SlideVersion = {
        id: generateId(),
        timestamp: Date.now(),
        label,
        state: JSON.parse(JSON.stringify(state)), // deep clone
    };
    versions.push(newVersion);
    // Limit versions to MAX_VERSIONS
    while (versions.length > MAX_VERSIONS) {
        versions.shift();
    }
    saveVersions(versions);
    return versions;
}

async function syncToApi(state: SlideState): Promise<boolean> {
    try {
        const res = await fetch("/api/slide-overrides", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state),
        });
        return res.ok;
    } catch {
        return false;
    }
}

// ─── Hook ──────────────────────────────────────────────────

export function useSlideStorage(
    totalSlides: number,
    initialData: any
) {
    // Initialize state from: localStorage > initialData > defaults
    const [slideOrder, setSlideOrder] = useState<number[]>(() => {
        const stored = loadFromLocalStorage(totalSlides);
        if (stored) return stored.slideOrder;

        // Fallback to imported JSON data
        if (initialData?.slideOrder?.length === totalSlides) {
            return initialData.slideOrder;
        }

        return Array.from({ length: totalSlides }, (_, i) => i);
    });

    const [textOverrides, setTextOverrides] = useState<{
        [slideIndex: number]: { [field: string]: string };
    }>(() => {
        const stored = loadFromLocalStorage(totalSlides);
        if (stored) return stored.textOverrides;

        // Fallback to imported JSON data
        if (initialData?.textOverrides) {
            const parsed: { [k: number]: { [f: string]: string } } = {};
            for (const k of Object.keys(initialData.textOverrides)) {
                parsed[Number(k)] = initialData.textOverrides[k];
            }
            return parsed;
        }
        return {};
    });

    const [saveStatus, setSaveStatus] = useState<
        "idle" | "saving" | "saved" | "error"
    >("idle");

    const [versions, setVersions] = useState<SlideVersion[]>(loadVersions);

    // Debounce ref for auto-save to API
    const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ─── Core save function ──────────────────────────────────

    const persistState = useCallback(
        (
            order: number[],
            overrides: { [slideIndex: number]: { [field: string]: string } },
            versionLabel?: string
        ) => {
            const state: SlideState = {
                slideOrder: order,
                textOverrides: overrides,
            };

            // 1. Instant: save to localStorage
            saveToLocalStorage(state);

            // 2. Create version if label provided
            if (versionLabel) {
                const updatedVersions = pushVersion(versionLabel, state);
                setVersions(updatedVersions);
            }

            // 3. Debounced: sync to disk via API (for git backup)
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
            setSaveStatus("saving");

            saveTimerRef.current = setTimeout(async () => {
                const ok = await syncToApi(state);
                setSaveStatus(ok ? "saved" : "error");
                setTimeout(() => setSaveStatus("idle"), 3000);
            }, 500); // debounce 500ms
        },
        []
    );

    // ─── Text change ─────────────────────────────────────────

    const handleTextChange = useCallback(
        (slideIndex: number, field: string, value: string) => {
            setTextOverrides((prev) => {
                const next = {
                    ...prev,
                    [slideIndex]: { ...prev[slideIndex], [field]: value },
                };
                // persist instantly to localStorage (no version for typing)
                saveToLocalStorage({ slideOrder, textOverrides: next });
                return next;
            });
        },
        [slideOrder]
    );

    // ─── Explicit save (button click) ────────────────────────

    const handleSave = useCallback(() => {
        persistState(slideOrder, textOverrides, "Salvamento manual");
    }, [slideOrder, textOverrides, persistState]);

    // ─── Reorder ─────────────────────────────────────────────

    const handleReorder = useCallback(
        (newOrder: number[]) => {
            setSlideOrder(newOrder);
            persistState(newOrder, textOverrides, "Reordenação de slides");
        },
        [textOverrides, persistState]
    );

    // ─── Restore version ────────────────────────────────────

    const restoreVersion = useCallback(
        (versionId: string) => {
            const version = versions.find((v) => v.id === versionId);
            if (!version) return;

            setSlideOrder(version.state.slideOrder);
            setTextOverrides(version.state.textOverrides);
            persistState(
                version.state.slideOrder,
                version.state.textOverrides,
                `Restaurado: ${version.label}`
            );
        },
        [versions, persistState]
    );

    // ─── Bootstrap: also fetch from API on mount (dev) ──────

    useEffect(() => {
        // If localStorage already has data, skip API fetch
        const stored = loadFromLocalStorage(totalSlides);
        if (stored) return;

        // Otherwise try to load from API (dev server only)
        fetch("/api/slide-overrides")
            .then((r) => r.json())
            .then((data) => {
                if (!data || typeof data !== "object") return;
                if (data.textOverrides) {
                    const parsed: { [k: number]: { [f: string]: string } } = {};
                    for (const k of Object.keys(data.textOverrides)) {
                        parsed[Number(k)] = data.textOverrides[k];
                    }
                    setTextOverrides(parsed);
                }
                if (
                    Array.isArray(data.slideOrder) &&
                    data.slideOrder.length === totalSlides
                ) {
                    setSlideOrder(data.slideOrder);
                }
            })
            .catch(() => { });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        slideOrder,
        setSlideOrder,
        textOverrides,
        setTextOverrides,
        saveStatus,
        handleTextChange,
        handleSave,
        handleReorder,
        versions,
        restoreVersion,
    };
}
