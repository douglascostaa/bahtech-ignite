import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { GraduationCap, Database, BarChart3, BookOpen } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const items = [
  { icon: GraduationCap, label: "Bolsista Data4Care", desc: "Pesquisa aplicada com Prof. Leonel — o mentor que mudou a trajetória" },
  { icon: Database, label: "Apps & Dados", desc: "Construindo aplicações reais desde o 2º semestre da faculdade" },
  { icon: BarChart3, label: "BI & Analytics", desc: "Dashboards, ETL e pipelines de dados para decisões estratégicas" },
  { icon: BookOpen, label: "Visão Full-Stack", desc: "Aprender o stack inteiro — do banco de dados à interface do usuário" },
];

const SlideAlicerce = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(2, "title", "O Alicerce Técnico");
  const desc = useSlideText(2, "desc", "A academia como trampolim");

  return (
    <SlideLayout>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slide-accent/5 blur-[150px]" />
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 01</div>
          <h2 className="font-display text-[80px] font-bold leading-[1.1] text-foreground mb-4">{title}</h2>
          <p className="text-[24px] text-slide-gray-light mb-14">{desc}</p>
        </motion.div>
        <div className="grid grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              className="bg-slide-surface border border-border rounded-3xl p-8 hover:border-slide-accent/40 transition-colors flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slide-accent/15 flex items-center justify-center shrink-0">
                <item.icon className="w-7 h-7 text-slide-accent" />
              </div>
              <div>
                <h3 className="text-[24px] font-semibold text-foreground mb-2">{item.label}</h3>
                <p className="text-[18px] text-slide-gray-light leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideAlicerce;
