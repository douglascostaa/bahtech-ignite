import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Copy, Trash2, Presentation, LogOut, Clock, User as UserIcon, Search, LayoutGrid } from "lucide-react";

interface PresentationItem {
    id: string;
    title: string;
    description: string;
    theme: string;
    created_at: string;
    updated_at: string;
    owner_id: string;
}

interface ActivityLog {
    id: string;
    action: string;
    details: Record<string, any>;
    created_at: string;
    user_name?: string;
    user_email?: string;
}

const Dashboard = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [presentations, setPresentations] = useState<PresentationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showLogs, setShowLogs] = useState(false);
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [logsLoading, setLogsLoading] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newTheme, setNewTheme] = useState("bahtech");
    const [creating, setCreating] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const loadPresentations = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase
            .from("slides_presentations")
            .select("*")
            .order("updated_at", { ascending: false });
        setPresentations(data || []);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadPresentations();
    }, [loadPresentations]);

    const loadLogs = useCallback(async () => {
        setLogsLoading(true);
        const { data } = await supabase
            .from("slides_activity_logs")
            .select("*, slides_users(name, email)")
            .order("created_at", { ascending: false })
            .limit(50);
        if (data) {
            setLogs(data.map((log: any) => ({
                ...log,
                user_name: log.slides_users?.name,
                user_email: log.slides_users?.email,
            })));
        }
        setLogsLoading(false);
    }, []);

    useEffect(() => {
        if (showLogs) loadLogs();
    }, [showLogs, loadLogs]);

    const handleCreate = async () => {
        if (!newTitle.trim() || !user) return;
        setCreating(true);

        const defaultOrder = Array.from({ length: 30 }, (_, i) => i);
        const { data, error } = await supabase
            .from("slides_presentations")
            .insert({
                title: newTitle.trim(),
                theme: newTheme,
                owner_id: user.id,
                slide_order: defaultOrder,
                text_overrides: {},
            })
            .select()
            .single();

        if (!error && data) {
            await supabase.from("slides_activity_logs").insert({
                user_id: user.id,
                action: "create",
                details: { title: newTitle.trim(), presentation_id: data.id },
            });
            setShowNewModal(false);
            setNewTitle("");
            loadPresentations();
        }
        setCreating(false);
    };

    const handleDuplicate = async (pres: PresentationItem) => {
        if (!user) return;
        const { data: original } = await supabase
            .from("slides_presentations")
            .select("*")
            .eq("id", pres.id)
            .single();

        if (original) {
            await supabase.from("slides_presentations").insert({
                title: `${original.title} (Cópia)`,
                description: original.description,
                theme: original.theme,
                owner_id: user.id,
                slide_order: original.slide_order,
                text_overrides: original.text_overrides,
            });
            await supabase.from("slides_activity_logs").insert({
                user_id: user.id,
                action: "duplicate",
                details: { title: pres.title, source_id: pres.id },
            });
            loadPresentations();
        }
    };

    const handleDelete = async (id: string) => {
        if (deleteConfirm !== id) {
            setDeleteConfirm(id);
            setTimeout(() => setDeleteConfirm(null), 4000);
            return;
        }
        await supabase.from("slides_presentations").delete().eq("id", id);
        if (user) {
            await supabase.from("slides_activity_logs").insert({
                user_id: user.id,
                action: "delete",
                details: { presentation_id: id },
            });
        }
        setDeleteConfirm(null);
        loadPresentations();
    };

    const filtered = presentations.filter(
        (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
    );

    const themeColors: Record<string, string> = {
        bahtech: "from-blue-600 to-blue-800",
        bahflash: "from-purple-600 to-purple-800",
        bahvitrine: "from-emerald-600 to-emerald-800",
        bahagenda: "from-orange-600 to-orange-800",
    };

    const themeLabels: Record<string, string> = {
        bahtech: "BahTech",
        bahflash: "Bah!Flash",
        bahvitrine: "Bah!Vitrine",
        bahagenda: "Bah!Agenda",
    };

    return (
        <div className="min-h-screen bg-[#0a0a1a]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Presentation className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-white font-bold text-lg font-display">BahTech Slides</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {user?.role === "superadmin" && (
                            <button
                                onClick={() => setShowLogs(!showLogs)}
                                className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all ${showLogs
                                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent"
                                    }`}
                            >
                                <Clock className="w-4 h-4" />
                                Logs
                            </button>
                        )}
                        <div className="flex items-center gap-2 text-zinc-400 text-sm bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-800">
                            <UserIcon className="w-4 h-4" />
                            <span>{user?.name}</span>
                            <span className="text-zinc-600 text-[10px] uppercase font-bold bg-zinc-700/50 px-1.5 py-0.5 rounded">
                                {user?.role}
                            </span>
                        </div>
                        <button
                            onClick={signOut}
                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-xl transition-all"
                            title="Sair"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Logs Panel (superadmin) */}
                {showLogs && user?.role === "superadmin" && (
                    <div className="mb-8 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                        <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-400" />
                            Logs de Atividade
                        </h3>
                        {logsLoading ? (
                            <p className="text-zinc-500 text-sm">Carregando...</p>
                        ) : logs.length === 0 ? (
                            <p className="text-zinc-500 text-sm">Nenhum log encontrado</p>
                        ) : (
                            <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                {logs.map((log) => (
                                    <div key={log.id} className="flex items-center gap-3 text-xs py-2 px-3 rounded-lg hover:bg-zinc-800/50">
                                        <span className="text-zinc-600 min-w-[120px]">
                                            {new Date(log.created_at).toLocaleString("pt-BR")}
                                        </span>
                                        <span className="text-zinc-400 font-medium min-w-[120px]">{log.user_name || "—"}</span>
                                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${log.action === "login" ? "bg-green-500/10 text-green-400" :
                                                log.action === "delete" ? "bg-red-500/10 text-red-400" :
                                                    "bg-blue-500/10 text-blue-400"
                                            }`}>
                                            {log.action}
                                        </span>
                                        <span className="text-zinc-600 truncate">
                                            {JSON.stringify(log.details)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Toolbar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <LayoutGrid className="w-5 h-5 text-zinc-500" />
                        <h2 className="text-white font-semibold text-lg">Apresentações</h2>
                        <span className="text-zinc-600 text-sm">({filtered.length})</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar apresentação..."
                                className="bg-zinc-800/50 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-[260px]"
                            />
                        </div>
                        <button
                            onClick={() => setShowNewModal(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                        >
                            <Plus className="w-4 h-4" />
                            Nova Apresentação
                        </button>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <Presentation className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                        <p className="text-zinc-500 text-sm">
                            {search ? "Nenhuma apresentação encontrada" : "Nenhuma apresentação criada ainda"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((pres) => (
                            <div
                                key={pres.id}
                                className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all hover:shadow-xl hover:shadow-black/20 cursor-pointer"
                                onClick={() => navigate(`/p/${pres.id}`)}
                            >
                                {/* Thumbnail area */}
                                <div className={`h-36 bg-gradient-to-br ${themeColors[pres.theme] || themeColors.bahtech} flex items-center justify-center relative`}>
                                    <Presentation className="w-10 h-10 text-white/30" />
                                    <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white/80 text-[10px] font-bold uppercase px-2 py-1 rounded-lg">
                                        {themeLabels[pres.theme] || pres.theme}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <h3 className="text-white font-semibold text-sm truncate mb-1">{pres.title}</h3>
                                    <p className="text-zinc-500 text-xs truncate mb-4">
                                        {pres.description || "Sem descrição"}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-600 text-[11px]">
                                            {new Date(pres.updated_at).toLocaleDateString("pt-BR")}
                                        </span>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDuplicate(pres); }}
                                                className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-zinc-800 rounded-lg transition-all"
                                                title="Duplicar"
                                            >
                                                <Copy className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(pres.id); }}
                                                className={`p-2 rounded-lg transition-all ${deleteConfirm === pres.id
                                                        ? "text-red-400 bg-red-500/10"
                                                        : "text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                                                    }`}
                                                title={deleteConfirm === pres.id ? "Clique novamente para confirmar" : "Excluir"}
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* New Presentation Modal */}
            {showNewModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowNewModal(false)}>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-white font-bold text-lg mb-6">Nova Apresentação</h3>

                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Título</label>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Ex: Pitch Investidores 2026"
                                    autoFocus
                                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Tema / Branding</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(themeLabels).map(([key, label]) => (
                                        <button
                                            key={key}
                                            onClick={() => setNewTheme(key)}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${newTheme === key
                                                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                                                    : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                                                }`}
                                        >
                                            <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${themeColors[key]}`} />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-8">
                            <button
                                onClick={() => setShowNewModal(false)}
                                className="flex-1 py-3 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreate}
                                disabled={!newTitle.trim() || creating}
                                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white disabled:opacity-50 transition-all"
                            >
                                {creating ? "Criando..." : "Criar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
