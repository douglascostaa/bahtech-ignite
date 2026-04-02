import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize, Grid3X3, Pencil } from "lucide-react";
import { SlideOverridesProvider } from "@/contexts/SlideOverridesContext";
import SlideCover from "@/components/slides/SlideCover";
import SlideErro2020 from "@/components/slides/SlideErro2020";
import SlideAlicerce from "@/components/slides/SlideAlicerce";
import SlideEscada from "@/components/slides/SlideEscada";
import SlidePulo from "@/components/slides/SlidePulo";
import SlideBahTechHoje from "@/components/slides/SlideBahTechHoje";
import SlideModuloDivider from "@/components/slides/SlideModuloDivider";
import SlideMorte5Min from "@/components/slides/SlideMorte5Min";
import SlideJunior2 from "@/components/slides/SlideJunior2";
import SlideObesidade from "@/components/slides/SlideObesidade";
import SlideAlavanca from "@/components/slides/SlideAlavanca";
import SlideDevFounder from "@/components/slides/SlideDevFounder";
import SlideDesafioEterno from "@/components/slides/SlideDesafioEterno";
import SlideProjetos from "@/components/slides/SlideProjetos";
import SlideEstudar from "@/components/slides/SlideEstudar";
import SlideMindset from "@/components/slides/SlideMindset";
import SlideMitos from "@/components/slides/SlideMitos";
import SlideRoadmap from "@/components/slides/SlideRoadmap";
import SlideConclusao from "@/components/slides/SlideConclusao";
import SlideProcessoReal from "@/components/slides/SlideProcessoReal";
import SlideConvergencia from "@/components/slides/SlideConvergencia";
import SlideConstruir from "@/components/slides/SlideConstruir";
import EditMode from "@/components/EditMode";

const TOTAL = 23;

const slideComponents = [
  () => <SlideCover total={TOTAL} />,
  () => <SlideErro2020 num={2} total={TOTAL} />,
  () => <SlideAlicerce num={3} total={TOTAL} />,
  () => <SlideEscada num={4} total={TOTAL} />,
  () => <SlidePulo num={5} total={TOTAL} />,
  () => <SlideBahTechHoje num={6} total={TOTAL} />,
  () => <SlideModuloDivider num={7} total={TOTAL} slideIndex={6} module="Módulo 02" title="O Novo Mercado" subtitle="Tech & IA estão mudando tudo" />,
  () => <SlideMorte5Min num={8} total={TOTAL} />,
  () => <SlideProcessoReal num={9} total={TOTAL} />,
  () => <SlideConvergencia num={10} total={TOTAL} />,
  () => <SlideConstruir num={11} total={TOTAL} />,
  () => <SlideJunior2 num={12} total={TOTAL} />,
  () => <SlideObesidade num={13} total={TOTAL} />,
  () => <SlideAlavanca num={14} total={TOTAL} />,
  () => <SlideDevFounder num={15} total={TOTAL} />,
  () => <SlideDesafioEterno num={16} total={TOTAL} />,
  () => <SlideModuloDivider num={17} total={TOTAL} slideIndex={16} module="Módulo 03" title="Visão de Futuro" subtitle="O que vem pela frente" />,
  () => <SlideProjetos num={18} total={TOTAL} />,
  () => <SlideEstudar num={19} total={TOTAL} />,
  () => <SlideMindset num={20} total={TOTAL} />,
  () => <SlideMitos num={21} total={TOTAL} />,
  () => <SlideRoadmap num={22} total={TOTAL} />,
  () => <SlideConclusao num={23} total={TOTAL} />,
];

const slideNames = [
  "Capa — Do Código ao CNPJ",
  "O Erro de 2020",
  "O Alicerce Técnico",
  "A Escada do Dev",
  "O Pulo do Gato",
  "BahTech Hoje",
  "Divisor — Módulo 02",
  "A Morte dos 5 Minutinhos",
  "O Processo Real",
  "A Convergência dos Papéis",
  "Construir é Comunicar",
  "O Júnior 2.0",
  "Obesidade de IA",
  "IA como Alavanca",
  "Dev-Founder",
  "O Desafio Eterno",
  "Divisor — Módulo 03",
  "Projetos BahTech",
  "Estudar de Forma Inteligente",
  "Mindset de Oportunidade",
  "Mitos Tech",
  "Roadmap Pessoal",
  "Conclusão & Networking",
];

const slideEditableFields: { [idx: number]: { field: string; label: string; value: string }[] } = {
  0: [
    { field: "subtitle", label: "Subtítulo", value: "BahTech • 2025" },
    { field: "title", label: "Título", value: "Do Código ao CNPJ" },
    { field: "desc", label: "Descrição", value: "Construindo a BahTech" },
    { field: "author", label: "Autor", value: "Douglas Costa" },
    { field: "role", label: "Cargo", value: "CEO & Founder, BahTech" },
  ],
  1: [
    { field: "title", label: "Título", value: "O Erro de 2020" },
    { field: "quote", label: "Citação", value: "Criei uma agência WordPress sem saber programar. E sem saber vender." },
  ],
  2: [
    { field: "title", label: "Título", value: "O Alicerce Técnico" },
    { field: "desc", label: "Descrição", value: "A academia como trampolim — não como destino" },
  ],
  3: [
    { field: "title", label: "Título", value: "A Escada do Dev" },
    { field: "desc", label: "Descrição", value: "Trajetória na Compass.UOL — cada degrau constrói o próximo" },
  ],
  4: [{ field: "title", label: "Título", value: "O Pulo do Gato" }],
  5: [
    { field: "title", label: "Título", value: "BahTech Hoje" },
    { field: "stat", label: "Estatística", value: "21" },
  ],
  6: [
    { field: "module", label: "Módulo", value: "Módulo 02" },
    { field: "title", label: "Título", value: "O Novo Mercado" },
    { field: "subtitle", label: "Subtítulo", value: "Tech & IA estão mudando tudo" },
  ],
  7: [{ field: "title", label: "Título", value: "A Morte dos \"5 Minutinhos\"" }],
  8: [{ field: "title", label: "Título", value: "O Processo Real de Software" }],
  9: [{ field: "title", label: "Título", value: "A Convergência dos Papéis" }],
  10: [{ field: "title", label: "Título", value: "A construção é a nova forma de comunicação" }],
  11: [{ field: "title", label: "Título", value: "O Júnior 2.0" }],
  12: [{ field: "title", label: "Título", value: "A Armadilha da \"Obesidade de IA\"" }],
  13: [{ field: "title", label: "Título", value: "IA como Alavanca de Complexidade" }],
  14: [{ field: "title", label: "Título", value: "O Surgimento do Dev-Founder" }],
  15: [{ field: "title", label: "Título", value: "O Desafio Eterno" }],
  16: [
    { field: "module", label: "Módulo", value: "Módulo 03" },
    { field: "title", label: "Título", value: "Visão de Futuro" },
    { field: "subtitle", label: "Subtítulo", value: "O que vem pela frente" },
  ],
  17: [{ field: "title", label: "Título", value: "Projetos BahTech" }],
  18: [{ field: "title", label: "Título", value: "Estudar de Forma Inteligente" }],
  19: [{ field: "title", label: "Título", value: "O Mindset de Oportunidade" }],
  20: [{ field: "title", label: "Título", value: "Mitos Destruídos" }],
  21: [{ field: "title", label: "Título", value: "Seu Roadmap Pessoal" }],
  22: [
    { field: "phrase", label: "Frase Final", value: "O futuro é de quem constrói" },
  ],
};

const TOTAL_SLIDES = slideComponents.length;

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [slideOrder, setSlideOrder] = useState<number[]>(() => Array.from({ length: TOTAL_SLIDES }, (_, i) => i));
  const [textOverrides, setTextOverrides] = useState<{ [slideIndex: number]: { [field: string]: string } }>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const updateScale = useCallback(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    setScale(Math.min(clientWidth / 1920, clientHeight / 1080));
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  // Load saved overrides from disk on startup
  useEffect(() => {
    fetch("/api/slide-overrides")
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === "object" && Object.keys(data).length > 0) {
          // Convert string keys back to numbers
          const parsed: { [slideIndex: number]: { [field: string]: string } } = {};
          for (const k of Object.keys(data)) {
            parsed[Number(k)] = data[k];
          }
          setTextOverrides(parsed);
        }
      })
      .catch(() => { }); // silently fail if API not available
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    setShowGrid(false);
    setShowEdit(false);
  }, [current]);

  const orderedSlides = slideOrder.map(i => slideComponents[i]);

  const next = useCallback(() => { if (current < TOTAL_SLIDES - 1) goTo(current + 1); }, [current, goTo]);
  const prev = useCallback(() => { if (current > 0) goTo(current - 1); }, [current, goTo]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }, []);

  const handleTextChange = useCallback((slideIndex: number, field: string, value: string) => {
    setTextOverrides(prev => ({
      ...prev,
      [slideIndex]: { ...prev[slideIndex], [field]: value },
    }));
  }, []);

  const handleSave = useCallback(async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/slide-overrides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(textOverrides),
      });
      if (res.ok) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }, [textOverrides]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showEdit) {
        if (e.key === "Escape") { e.preventDefault(); setShowEdit(false); }
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "f" || e.key === "F5") { e.preventDefault(); toggleFullscreen(); }
      if (e.key === "Escape" && showGrid) setShowGrid(false);
      if (e.key === "g") setShowGrid(g => !g);
      if (e.key === "e") { setShowEdit(true); setShowGrid(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, toggleFullscreen, showGrid, showEdit]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  // Edit mode
  if (showEdit) {
    return (
      <SlideOverridesProvider value={textOverrides}>
        <EditMode
          slides={slideComponents}
          slideOrder={slideOrder}
          onClose={() => setShowEdit(false)}
          onReorder={setSlideOrder}
          textOverrides={textOverrides}
          onTextChange={handleTextChange}
          slideNames={slideNames}
          slideEditableFields={slideEditableFields}
          onSave={handleSave}
          saveStatus={saveStatus}
        />
      </SlideOverridesProvider>
    );
  }

  if (showGrid) {
    return (
      <SlideOverridesProvider value={textOverrides}>
        <div className="min-h-screen bg-background p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-foreground font-display text-2xl font-bold">Visão Geral dos Slides</h2>
            <button onClick={() => setShowGrid(false)} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Voltar (ESC)
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {slideOrder.map((slideIdx, orderPos) => {
              const Slide = slideComponents[slideIdx];
              return (
                <button key={orderPos} onClick={() => goTo(orderPos)}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all hover:border-accent
                    ${orderPos === current ? 'border-accent shadow-lg shadow-accent/20' : 'border-border'}`}>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <div className="absolute inset-0" style={{ transform: `scale(${1 / 5})`, transformOrigin: 'top left', width: '500%', height: '500%' }}>
                      <Slide />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-foreground font-medium">
                    {orderPos + 1}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </SlideOverridesProvider>
    );
  }

  const CurrentSlide = orderedSlides[current];
  const scaledW = 1920 * scale;
  const scaledH = 1080 * scale;

  return (
    <SlideOverridesProvider value={textOverrides}>
      <div ref={containerRef} className="relative w-screen h-screen bg-background overflow-hidden select-none cursor-default">
        {/* Slide area */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ width: scaledW, height: scaledH }}
              className="flex items-center justify-center shrink-0"
            >
              <div
                style={{
                  width: 1920,
                  height: 1080,
                  transform: `scale(${scale})`,
                  transformOrigin: 'center center',
                }}
              >
                {CurrentSlide()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-secondary/80 backdrop-blur-md rounded-full px-4 py-2 border border-border opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ opacity: undefined }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.3'}>
          <button onClick={prev} disabled={current === 0}
            className="p-2 rounded-full hover:bg-muted transition-colors disabled:opacity-30 text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-muted-foreground font-medium min-w-[60px] text-center">
            {current + 1} / {TOTAL_SLIDES}
          </span>
          <button onClick={next} disabled={current === TOTAL_SLIDES - 1}
            className="p-2 rounded-full hover:bg-muted transition-colors disabled:opacity-30 text-foreground">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="w-px h-5 bg-border" />
          <button onClick={() => setShowEdit(true)} className="p-2 rounded-full hover:bg-muted transition-colors text-foreground" title="Editar (E)">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setShowGrid(true)} className="p-2 rounded-full hover:bg-muted transition-colors text-foreground" title="Grid (G)">
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button onClick={toggleFullscreen} className="p-2 rounded-full hover:bg-muted transition-colors text-foreground">
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>

        {/* Click zones for navigation */}
        <div className="absolute inset-y-0 left-0 w-1/4 cursor-pointer z-10" onClick={prev} />
        <div className="absolute inset-y-0 right-0 w-1/4 cursor-pointer z-10" onClick={next} />
      </div>
    </SlideOverridesProvider>
  );
};

export default Index;
