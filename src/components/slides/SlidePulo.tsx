import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Rocket } from "lucide-react";

const SlidePulo = ({ num, total }: { num: number; total: number }) => (
  <SlideLayout>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[800px] h-[800px] rounded-full bg-slide-accent/5 animate-pulse-glow" />
    </div>
    <div className="relative z-10 flex items-center justify-center h-full px-[140px]">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }} className="text-center max-w-[1200px]">
        <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-8">Módulo 01</div>
        <div className="w-20 h-20 rounded-full bg-slide-accent/20 flex items-center justify-center mx-auto mb-10">
          <Rocket className="w-10 h-10 text-slide-accent" />
        </div>
        <h2 className="font-display text-[88px] font-bold leading-[1.05] text-foreground mb-8">
          O Pulo do <span className="slide-gradient-text">Gato</span>
        </h2>
        <p className="text-[30px] text-slide-gray-light font-light">
          O momento de largar o "seguro"<br/>e focar 100% na BahTech
        </p>
      </motion.div>
    </div>
    <SlideNumber current={num} total={total} />
  </SlideLayout>
);

export default SlidePulo;
