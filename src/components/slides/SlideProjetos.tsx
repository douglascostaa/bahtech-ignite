import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Briefcase, Bot, Globe, BarChart } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const projects = [
  { icon: Bot, label: "Automação com IA", desc: "Chatbots e fluxos inteligentes" },
  { icon: Globe, label: "Plataformas Web", desc: "SaaS para diversos segmentos" },
  { icon: BarChart, label: "Data & Analytics", desc: "Dashboards e BI customizado" },
  { icon: Briefcase, label: "Consultoria Tech", desc: "Transformação digital em empresas" },
];

const SlideProjetos = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(17, "title", "Projetos BahTech");

  return (
    <SlideLayout>
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 03 — Visão de Futuro</div>
          <h2 className="font-display text-[72px] font-bold leading-[1.1] text-foreground mb-16">{title}</h2>
        </motion.div>
        <div className="grid grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-slide-surface border border-border rounded-3xl p-10 hover:border-slide-accent/30 transition-colors">
              <p.icon className="w-10 h-10 text-slide-accent mb-6" />
              <h3 className="text-[26px] font-bold text-foreground mb-3">{p.label}</h3>
              <p className="text-[20px] text-slide-gray-light">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideProjetos;
