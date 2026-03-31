import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { GraduationCap, Database, BarChart3 } from "lucide-react";

const items = [
  { icon: GraduationCap, label: "Bolsista Data4Care", desc: "Pesquisa aplicada com Prof. Leonel" },
  { icon: Database, label: "Apps & Dados", desc: "Desenvolvimento real desde a academia" },
  { icon: BarChart3, label: "BI & Analytics", desc: "Inteligência de dados na prática" },
];

const SlideAlicerce = ({ num, total }: { num: number; total: number }) => (
  <SlideLayout>
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slide-accent/5 blur-[150px]" />
    <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 01</div>
        <h2 className="font-display text-[80px] font-bold leading-[1.1] text-foreground mb-16">
          O Alicerce <span className="slide-gradient-text">Técnico</span>
        </h2>
      </motion.div>

      <div className="flex gap-8">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
            className="flex-1 bg-slide-surface border border-border rounded-3xl p-10 hover:border-slide-accent/40 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-slide-accent/15 flex items-center justify-center mb-6">
              <item.icon className="w-7 h-7 text-slide-accent" />
            </div>
            <h3 className="text-[26px] font-semibold text-foreground mb-3">{item.label}</h3>
            <p className="text-[20px] text-slide-gray-light">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
    <SlideNumber current={num} total={total} />
  </SlideLayout>
);

export default SlideAlicerce;
