import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { AlertTriangle, XCircle, TrendingDown } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const SlideErro2020 = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(1, "title", "O Erro de 2020");
  const quote = useSlideText(1, "quote", "Criei uma agência WordPress sem saber programar. E sem saber vender.");

  return (
    <SlideLayout>
      <div className="slide-dot-grid absolute inset-0 opacity-30" />
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 01 — A Jornada Real</div>
          <h2 className="font-display text-[80px] font-bold leading-[1.1] text-foreground mb-12">{title}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
          className="flex gap-12 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <span className="text-[32px] text-foreground font-semibold">Agência WordPress</span>
            </div>
            <p className="text-[24px] text-slide-gray-light leading-relaxed mb-6">{quote}</p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 text-[18px] text-slide-gray">
                <XCircle className="w-5 h-5 text-destructive/70" />Sem conhecimento técnico
              </div>
              <div className="flex items-center gap-2 text-[18px] text-slide-gray">
                <TrendingDown className="w-5 h-5 text-destructive/70" />Sem modelo de negócio
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-slide-surface border border-border rounded-3xl p-12">
              <div className="text-[48px] font-display font-bold text-foreground mb-4">"Ter a ideia</div>
              <div className="text-[48px] font-display font-bold slide-gradient-text mb-6">≠ Ter o negócio"</div>
              <p className="text-[18px] text-slide-gray leading-relaxed">
                O mercado não perdoa entusiasmo sem preparo.<br/>
                Esse fracasso foi o maior aprendizado da jornada.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideErro2020;
