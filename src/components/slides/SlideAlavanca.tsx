import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Blocks, Church } from "lucide-react";

const SlideAlavanca = ({ num, total }: { num: number; total: number }) => (
  <SlideLayout>
    <div className="relative z-10 flex items-center h-full px-[140px]">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
        <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 02</div>
        <h2 className="font-display text-[72px] font-bold leading-[1.1] text-foreground mb-10">
          IA como Alavanca<br/>de <span className="slide-gradient-text">Complexidade</span>
        </h2>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }} className="flex-1 flex flex-col gap-8">
        <div className="bg-slide-surface border border-border rounded-3xl p-10 flex items-center gap-8">
          <Blocks className="w-12 h-12 text-slide-gray shrink-0" />
          <div>
            <div className="text-[16px] text-slide-gray uppercase tracking-wider mb-2">IA faz o</div>
            <div className="text-[32px] font-display font-bold text-foreground">Tijolo</div>
            <div className="text-[18px] text-slide-gray-light">Boilerplate, CRUD, repetição</div>
          </div>
        </div>
        <div className="bg-slide-accent/10 border border-slide-accent/20 rounded-3xl p-10 flex items-center gap-8">
          <Church className="w-12 h-12 text-slide-accent shrink-0" />
          <div>
            <div className="text-[16px] text-slide-accent uppercase tracking-wider mb-2">Você desenha a</div>
            <div className="text-[32px] font-display font-bold text-foreground">Catedral</div>
            <div className="text-[18px] text-slide-gray-light">Arquitetura, estratégia, negócio</div>
          </div>
        </div>
      </motion.div>
    </div>
    <SlideNumber current={num} total={total} />
  </SlideLayout>
);

export default SlideAlavanca;
