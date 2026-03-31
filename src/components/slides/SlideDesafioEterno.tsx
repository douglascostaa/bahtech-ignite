import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Target, Zap, Users, Award } from "lucide-react";

const tips = [
  { icon: Target, label: "Portfólio com IA", desc: "Projetos reais, não tutoriais" },
  { icon: Zap, label: "Velocidade", desc: "Entregar rápido e com qualidade" },
  { icon: Users, label: "Network", desc: "Comunidade > Currículo" },
  { icon: Award, label: "Diferencial", desc: "Resolver problemas, não só codar" },
];

const SlideDesafioEterno = ({ num, total }: { num: number; total: number }) => (
  <SlideLayout>
    <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 02</div>
        <h2 className="font-display text-[72px] font-bold leading-[1.1] text-foreground mb-16">
          O Desafio <span className="slide-gradient-text">Eterno</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {tips.map((tip, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-6 bg-slide-surface border border-border rounded-2xl p-8">
            <div className="w-14 h-14 rounded-2xl bg-slide-accent/15 flex items-center justify-center shrink-0">
              <tip.icon className="w-7 h-7 text-slide-accent" />
            </div>
            <div>
              <div className="text-[24px] font-semibold text-foreground mb-1">{tip.label}</div>
              <div className="text-[18px] text-slide-gray-light">{tip.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <SlideNumber current={num} total={total} />
  </SlideLayout>
);

export default SlideDesafioEterno;
