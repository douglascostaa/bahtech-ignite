import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X, GripVertical, Pencil, Check } from "lucide-react";

interface SlideTextOverrides {
  [slideIndex: number]: { [field: string]: string };
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
}: EditModeProps) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [editingSlide, setEditingSlide] = useState<number | null>(null);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-secondary/90 backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Pencil className="w-5 h-5 text-accent" />
          <h2 className="text-foreground font-display text-xl font-bold">Modo de Edição</h2>
          <span className="text-muted-foreground text-sm ml-2">Arraste para reorganizar • Clique no ícone ✏️ para editar texto</span>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm px-4 py-2 rounded-lg hover:bg-muted">
          <X className="w-4 h-4" />
          Fechar (ESC)
        </button>
      </div>

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
