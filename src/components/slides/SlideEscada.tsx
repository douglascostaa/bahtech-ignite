import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";

const steps = [
  { year: "2021", role: "Bolsista", desc: "Programa de capacitação" },
  { year: "2022", role: "Trainee", desc: "Primeiro contato corporativo" },
  { year: "2022", role: "Júnior", desc: "Entregando em produção" },
  { year: "2023", role: "Pleno", desc: "Liderando features complexas" },
];

const SlideEscada = ({ num, total }: { num: number; total: number }) => (
  <SlideLayout>
    <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 01</div>
        <h2 className="font-display text-[72px] font-bold leading-[1.1] text-foreground mb-6">
          A Escada do <span className="slide-gradient-text">Dev</span>
        </h2>
        <p className="text-[24px] text-slide-gray-light mb-16">Trajetória na Compass.UOL</p>
      </motion.div>

      <div className="flex items-end gap-6 h-[400px]">
        {steps.map((step, i) => (
          <motion.div key={i} initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.4 + i * 0.2, duration: 0.5 }} style={{ originY: 1, height: `${40 + i * 20}%` }}
            className="flex-1 bg-gradient-to-t from-slide-accent/30 to-slide-accent/5 border border-slide-accent/20 rounded-3xl p-8 flex flex-col justify-end">
            <div className="text-[16px] text-slide-accent font-medium mb-2">{step.year}</div>
            <div className="text-[28px] font-bold text-foreground mb-1">{step.role}</div>
            <div className="text-[18px] text-slide-gray-light">{step.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
    <SlideNumber current={num} total={total} />
  </SlideLayout>
);

export default SlideEscada;
