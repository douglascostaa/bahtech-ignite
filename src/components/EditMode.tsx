import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GripVertical, Pencil, Check, Save, Loader2, History, RotateCcw, Clock } from "lucide-react";

interface SlideTextOverrides {
  [slideIndex: number]: { [field: string]: string };
}

interface SlideVersion {
  id: string;
  timestamp: number;
  label: string;
  state: {
    slideOrder: number[];
    textOverrides: { [slideIndex: number]: { [field: string]: string } };
  };
}

interface EditModeProps {
  slides: Array<() => JSX.Element>;
  slideOrder: number[];
  onClose: () => void;
  onReorder: (newOrder: number[]) => void;
  textOverrides: SlideTextOverrides;
  onTextChange: (slideIndex: number, field: string, value: string) => void;
  slideNames: string[];
  slideEditableFields: { [slideIndex: number]: { field: string; label: string; value: string }[] };
  onSave?: () => void;
  saveStatus?: "idle" | "saving" | "saved" | "error";
  versions?: SlideVersion[];
  onRestoreVersion?: (versionId: string) => void;
}

function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "agora mesmo";
  if (minutes < 60) return `${minutes}min atrás`;
  if (hours < 24) return `${hours}h atrás`;
  if (days === 1) return "ontem";
  return `${days} dias atrás`;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const EditMode = ({
  slides,
  slideOrder,
  onClose,
  onReorder,
  textOverrides,
  onTextChange,
  slideNames,
  slideEditableFields,
  onSave,
  saveStatus = "idle",
  versions = [],
  onRestoreVersion,
}: EditModeProps) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [editingSlide, setEditingSlide] = useState<number | null>(null);
  const [showVersions, setShowVersions] = useState(false);
  const [confirmRestore, setConfirmRestore] = useState<string | null>(null);
  const dragItemRef = useRef<number | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    dragItemRef.current = index;
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const fromIndex = dragItemRef.current;
    if (fromIndex === null || fromIndex === dropIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const newOrder = [...slideOrder];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(dropIndex, 0, moved);
    onReorder(newOrder);
    setDragIndex(null);
    setDragOverIndex(null);
  }, [slideOrder, onReorder]);

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  const handleRestore = (versionId: string) => {
    if (confirmRestore === versionId) {
      onRestoreVersion?.(versionId);
      setConfirmRestore(null);
      setShowVersions(false);
    } else {
      setConfirmRestore(versionId);
      setTimeout(() => setConfirmRestore(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-secondary/90 backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Pencil className="w-5 h-5 text-accent" />
          <h2 className="text-foreground font-display text-xl font-bold">Modo de Edição</h2>
          <span className="text-muted-foreground text-sm ml-2">Arraste para reorganizar • Clique no ícone ✏️ para editar texto</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Versions button */}
          <div className="relative">
            <button
              onClick={() => { setShowVersions(!showVersions); setConfirmRestore(null); }}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-medium transition-all
                ${showVersions
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                }`}
            >
              <History className="w-4 h-4" />
              Versões
              {versions.length > 0 && (
                <span className="bg-purple-500/30 text-purple-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {versions.length}
                </span>
              )}
            </button>

            {/* Versions dropdown */}
            <AnimatePresence>
              {showVersions && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-[calc(100%+8px)] w-[400px] max-h-[480px] bg-secondary border border-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-[100]"
                >
                  {/* Dropdown header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-purple-400" />
                      <span className="text-foreground font-semibold text-sm">Histórico de Versões</span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {versions.length} {versions.length === 1 ? "versão" : "versões"}
                    </span>
                  </div>

                  {/* Version list */}
                  <div className="overflow-y-auto max-h-[400px] p-2">
                    {versions.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="bg-muted rounded-full p-4 mb-4">
                          <Clock className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-sm font-medium mb-1">Nenhuma versão salva ainda</p>
                        <p className="text-muted-foreground/60 text-xs">Clique em "Salvar" para criar a primeira versão</p>
                      </div>
                    ) : (
                      [...versions].reverse().map((version, i) => {
                        const isLatest = i === 0;
                        const isConfirming = confirmRestore === version.id;

                        return (
                          <motion.div
                            key={version.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all mb-1
                              ${isLatest ? "bg-purple-500/8 border border-purple-500/20" : "hover:bg-muted/50 border border-transparent"}
                              ${isConfirming ? "bg-amber-500/10 border-amber-500/30" : ""}`}
                          >
                            <div className="flex items-start gap-3 min-w-0 flex-1">
                              <div className={`shrink-0 mt-0.5 w-2 h-2 rounded-full ${isLatest ? "bg-purple-400" : "bg-muted-foreground/30"}`} />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-foreground text-sm font-medium truncate">
                                    {version.label}
                                  </span>
                                  {isLatest && (
                                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/20 px-1.5 py-0.5 rounded-full shrink-0">
                                      ATUAL
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-muted-foreground text-xs">{formatTimeAgo(version.timestamp)}</span>
                                  <span className="text-muted-foreground/40 text-xs">•</span>
                                  <span className="text-muted-foreground/60 text-xs">{formatDate(version.timestamp)}</span>
                                </div>
                              </div>
                            </div>

                            {!isLatest && onRestoreVersion && (
                              <button
                                onClick={() => handleRestore(version.id)}
                                className={`shrink-0 ml-3 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all
                                  ${isConfirming
                                    ? "bg-amber-500 text-black"
                                    : "opacity-0 group-hover:opacity-100 bg-muted text-muted-foreground hover:text-foreground hover:bg-muted-foreground/20"
                                  }`}
                              >
                                <RotateCcw className="w-3 h-3" />
                                {isConfirming ? "Confirmar!" : "Restaurar"}
                              </button>
                            )}
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {onSave && (
            <button
              onClick={onSave}
              disabled={saveStatus === "saving"}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-medium transition-all
                ${saveStatus === "saved"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : saveStatus === "error"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : saveStatus === "saving"
                      ? "bg-accent/20 text-accent border border-accent/30 cursor-wait"
                      : "bg-accent text-accent-foreground hover:bg-accent/90"
                }`}
            >
              {saveStatus === "saving" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : saveStatus === "saved" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saveStatus === "saving"
                ? "Salvando..."
                : saveStatus === "saved"
                  ? "Salvo! ✓"
                  : saveStatus === "error"
                    ? "Erro ao salvar"
                    : "Salvar"}
            </button>
          )}
          <button onClick={onClose} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm px-4 py-2 rounded-lg hover:bg-muted">
            <X className="w-4 h-4" />
            Fechar (ESC)
          </button>
        </div>
      </div>

      {/* Click outside to close versions */}
      {showVersions && (
        <div className="fixed inset-0 z-40" onClick={() => setShowVersions(false)} />
      )}

      <div className="flex">
        {/* Grid */}
        <div className={`flex-1 p-8 transition-all ${editingSlide !== null ? 'pr-4' : ''}`}>
          <div className="grid grid-cols-3 gap-5">
            {slideOrder.map((slideIdx, orderPos) => {
              const Slide = slides[slideIdx];
              const isDragging = dragIndex === orderPos;
              const isDragOver = dragOverIndex === orderPos;

              return (
                <motion.div
                  key={`${slideIdx}-${orderPos}`}
                  layout
                  className={`relative group rounded-xl border-2 transition-all cursor-grab active:cursor-grabbing
                    ${isDragging ? 'opacity-40 scale-95 border-accent' : ''}
                    ${isDragOver ? 'border-accent shadow-lg shadow-accent/20 scale-[1.02]' : 'border-border hover:border-muted-foreground/30'}
                    ${editingSlide === slideIdx ? 'ring-2 ring-accent border-accent' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e as any, orderPos)}
                  onDragOver={(e) => handleDragOver(e as any, orderPos)}
                  onDrop={(e) => handleDrop(e as any, orderPos)}
                  onDragEnd={handleDragEnd}
                >
                  {/* Slide preview */}
                  <div className="relative w-full overflow-hidden rounded-t-xl" style={{ paddingBottom: '56.25%' }}>
                    <div className="absolute inset-0 pointer-events-none" style={{ transform: `scale(${1 / 5})`, transformOrigin: 'top left', width: '500%', height: '500%' }}>
                      <Slide />
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 rounded-b-xl border-t border-border">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {orderPos + 1}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                        {slideNames[slideIdx] || `Slide ${slideIdx + 1}`}
                      </span>
                    </div>
                    {slideEditableFields[slideIdx] && slideEditableFields[slideIdx].length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSlide(editingSlide === slideIdx ? null : slideIdx);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${editingSlide === slideIdx ? 'bg-accent text-accent-foreground' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                      >
                        {editingSlide === slideIdx ? <Check className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Edit Panel */}
        {editingSlide !== null && slideEditableFields[editingSlide] && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="w-[380px] shrink-0 bg-secondary/50 border-l border-border p-6 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground font-display text-lg font-semibold">
                Editar Slide {slideOrder.indexOf(editingSlide) + 1}
              </h3>
              <button onClick={() => setEditingSlide(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-muted-foreground text-sm mb-6">{slideNames[editingSlide]}</p>

            <div className="space-y-5">
              {slideEditableFields[editingSlide].map(({ field, label, value }) => {
                const currentValue = textOverrides[editingSlide]?.[field] ?? value;
                const isLong = value.length > 60;

                return (
                  <div key={field}>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                      {label}
                    </label>
                    {isLong ? (
                      <textarea
                        value={currentValue}
                        onChange={(e) => onTextChange(editingSlide, field, e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none min-h-[80px]"
                        rows={3}
                      />
                    ) : (
                      <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => onTextChange(editingSlide, field, e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EditMode;
