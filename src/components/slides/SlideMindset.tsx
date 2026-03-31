import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Sparkles } from "lucide-react";

const SlideMindset = ({ num, total }: { num: number; total: number }) => (
  <SlideLayout>
    <div className="absolute inset-0 bg-gradient-to-br from-slide-accent/8 via-transparent to-transparent" />
    <div className="relative z-10 flex items-center justify-center h-full px-[140px]">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }} className="text-center max-w-[1000px]">
        <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-8">Módulo 03</div>
        <Sparkles className="w-16 h-16 text-slide-accent mx-auto mb-10" />
        <h2 className="font-display text-[80px] font-bold leading-[1.1] text-foreground mb-10">
          O Mindset de<br/><span className="slide-gradient-text">Oportunidade</span>
        </h2>
        <p className="text-[30px] text-slide-gray-light font-light leading-relaxed">
          "Abraçar as oportunidades que aparecem.<br/>Mesmo quando você não se sente pronto."
        </p>
      </motion.div>
    </div>
    <SlideNumber current={num} total={total} />
  </SlideLayout>
);

export default SlideMindset;
