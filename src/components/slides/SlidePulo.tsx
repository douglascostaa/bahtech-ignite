import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Rocket, TrendingUp, Shield, Heart } from "lucide-react";

const factors = [
  { icon: TrendingUp, label: "Receita crescendo" },
  { icon: Shield, label: "Reserva financeira" },
  { icon: Heart, label: "Paixão pelo produto" },
];

const SlidePulo = ({ num, total }: { num: number; total: number }) => (
  <SlideLayout>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[800px] h-[800px] rounded-full bg-slide-accent/5 animate-pulse-glow" />
    </div>
    <div className="relative z-10 flex items-center h-full px-[140px]">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }} className="flex-1">
        <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-8">Módulo 01</div>
        <div className="w-20 h-20 rounded-full bg-slide-accent/20 flex items-center justify-center mb-10">
          <Rocket className="w-10 h-10 text-slide-accent" />
        </div>
        <h2 className="font-display text-[80px] font-bold leading-[1.05] text-foreground mb-8">
          O Pulo do <span className="slide-gradient-text">Gato</span>
        </h2>
        <p className="text-[28px] text-slide-gray-light font-light mb-12">
          O momento de largar o "seguro"<br/>e focar 100% na BahTech
        </p>
        <div className="flex gap-6">
          {factors.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.15 }}
              className="flex items-center gap-3 bg-slide-surface border border-border rounded-2xl px-6 py-4">
              <f.icon className="w-5 h-5 text-slide-accent" />
              <span className="text-[18px] text-foreground font-medium">{f.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }} className="flex-1 flex justify-center">
        <div className="bg-slide-surface border border-border rounded-3xl p-12 max-w-[450px]">
          <p className="text-[22px] text-slide-gray-light leading-relaxed mb-6">
            "A decisão mais difícil não é empreender — é saber a <span className="text-foreground font-semibold">hora certa</span> de pular."
          </p>
          <p className="text-[18px] text-slide-gray leading-relaxed">
            Saí da Compass com carteira de clientes, produto validado e um plano de 6 meses. Não foi impulso — foi estratégia.
          </p>
        </div>
      </motion.div>
    </div>
    <SlideNumber current={num} total={total} />
  </SlideLayout>
);

export default SlidePulo;
