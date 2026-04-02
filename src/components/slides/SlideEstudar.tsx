import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { BookOpen, Brain, Wrench, Users } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const areas = [
  { icon: Brain, label: "Fundamentos", desc: "Algoritmos, estruturas, arquitetura" },
  { icon: Wrench, label: "Ferramentas", desc: "Git, Cloud, CI/CD, Docker" },
  { icon: BookOpen, label: "IA Aplicada", desc: "Prompts, RAG, agentes, automação" },
  { icon: Users, label: "Soft Skills", desc: "Comunicação, liderança, negócio" },
];

const SlideEstudar = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(18, "title", "Estudar de Forma Inteligente");

  return (
    <SlideLayout>
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 03</div>
          <h2 className="font-display text-[72px] font-bold leading-[1.1] text-foreground mb-6">{title}</h2>
          <p className="text-[24px] text-slide-gray-light mb-16">Onde focar para não ser substituído</p>
        </motion.div>
        <div className="flex gap-6">
          {areas.map((area, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="flex-1 text-center bg-slide-surface border border-border rounded-3xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-slide-accent/15 flex items-center justify-center mx-auto mb-5">
                <area.icon className="w-7 h-7 text-slide-accent" />
              </div>
              <h3 className="text-[22px] font-semibold text-foreground mb-2">{area.label}</h3>
              <p className="text-[17px] text-slide-gray-light">{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideEstudar;
