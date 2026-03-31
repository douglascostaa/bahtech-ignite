import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { ShieldAlert } from "lucide-react";

const SlideObesidade = ({ num, total }: { num: number; total: number }) => (
  <SlideLayout>
    <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 02</div>
        <h2 className="font-display text-[72px] font-bold leading-[1.1] text-foreground mb-16">
          A Armadilha da<br/><span className="slide-gradient-text">"Obesidade de IA"</span>
        </h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="flex gap-12 items-start">
        <div className="flex-1 bg-destructive/10 border border-destructive/20 rounded-3xl p-10">
          <ShieldAlert className="w-10 h-10 text-destructive mb-6" />
          <h3 className="text-[28px] font-bold text-foreground mb-4">Distração</h3>
          <p className="text-[22px] text-slide-gray-light">
            Usar 20 ferramentas.<br/>Não dominar nenhuma.
          </p>
        </div>
        <div className="flex-1 bg-slide-accent/10 border border-slide-accent/20 rounded-3xl p-10">
          <div className="w-10 h-10 rounded-full bg-slide-accent/20 flex items-center justify-center mb-6">
            <span className="text-slide-accent text-[24px] font-bold">✓</span>
          </div>
          <h3 className="text-[28px] font-bold text-foreground mb-4">Foco</h3>
          <p className="text-[22px] text-slide-gray-light">
            Dominar 2–3 ferramentas.<br/>Entregar resultado real.
          </p>
        </div>
      </motion.div>
    </div>
    <SlideNumber current={num} total={total} />
  </SlideLayout>
);

export default SlideObesidade;
