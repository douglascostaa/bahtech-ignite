import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize, Grid3X3 } from "lucide-react";
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

const TOTAL = 20;

const slideComponents = [
  () => <SlideCover total={TOTAL} />,
  () => <SlideErro2020 num={2} total={TOTAL} />,
  () => <SlideAlicerce num={3} total={TOTAL} />,
  () => <SlideEscada num={4} total={TOTAL} />,
  () => <SlidePulo num={5} total={TOTAL} />,
  () => <SlideBahTechHoje num={6} total={TOTAL} />,
  () => <SlideModuloDivider num={7} total={TOTAL} module="Módulo 02" title="O Novo Mercado" subtitle="Tech & IA estão mudando tudo" />,
  () => <SlideMorte5Min num={8} total={TOTAL} />,
  () => <SlideJunior2 num={9} total={TOTAL} />,
  () => <SlideObesidade num={10} total={TOTAL} />,
  () => <SlideAlavanca num={11} total={TOTAL} />,
  () => <SlideDevFounder num={12} total={TOTAL} />,
  () => <SlideDesafioEterno num={13} total={TOTAL} />,
  () => <SlideModuloDivider num={14} total={TOTAL} module="Módulo 03" title="Visão de Futuro" subtitle="O que vem pela frente" />,
  () => <SlideProjetos num={15} total={TOTAL} />,
  () => <SlideEstudar num={16} total={TOTAL} />,
  () => <SlideMindset num={17} total={TOTAL} />,
  () => <SlideMitos num={18} total={TOTAL} />,
  () => <SlideRoadmap num={19} total={TOTAL} />,
  () => <SlideConclusao num={20} total={TOTAL} />,
];

const allSlides = slideComponents;

const TOTAL_SLIDES = allSlides.length;

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

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

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    setShowGrid(false);
  }, [current]);

  const next = useCallback(() => { if (current < TOTAL_SLIDES - 1) goTo(current + 1); }, [current, goTo]);
  const prev = useCallback(() => { if (current > 0) goTo(current - 1); }, [current, goTo]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "f" || e.key === "F5") { e.preventDefault(); toggleFullscreen(); }
      if (e.key === "Escape" && showGrid) setShowGrid(false);
      if (e.key === "g") setShowGrid(g => !g);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, toggleFullscreen, showGrid]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  if (showGrid) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-foreground font-display text-2xl font-bold">Visão Geral dos Slides</h2>
          <button onClick={() => setShowGrid(false)} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Voltar (ESC)
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {allSlides.map((Slide, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`relative overflow-hidden rounded-xl border-2 transition-all hover:border-accent
                ${i === current ? 'border-accent shadow-lg shadow-accent/20' : 'border-border'}`}>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute inset-0" style={{ transform: `scale(${1 / 5})`, transformOrigin: 'top left', width: '500%', height: '500%' }}>
                  <Slide />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-foreground font-medium">
                {i + 1}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-screen h-screen bg-background overflow-hidden select-none cursor-default">
      {/* Slide area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={current} custom={direction}
            variants={variants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            {allSlides[current]()}
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
        <button onClick={() => setShowGrid(true)} className="p-2 rounded-full hover:bg-muted transition-colors text-foreground">
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
  );
};

export default Index;
