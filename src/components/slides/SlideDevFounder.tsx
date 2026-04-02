import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Code2, Lightbulb, Rocket } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const steps = [
  { icon: Code2, label: "Dev", desc: "Sabe construir" },
  { icon: Lightbulb, label: "Founder", desc: "Sabe o que construir" },
  { icon: Rocket, label: "Dev-Founder", desc: "Constrói o que importa" },
];

const SlideDevFounder = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(14, "title", "O Surgimento do Dev-Founder");

  return (
    <SlideLayout>
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 02</div>
          <h2 className="font-display text-[80px] font-bold leading-[1.1] text-foreground mb-6">{title}</h2>
          <p className="text-[24px] text-slide-gray-light mb-16">A IA democratizou o lançamento de SaaS</p>
        </motion.div>
        <div className="flex items-center gap-6">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2 }} className="flex items-center gap-6">
              <div className={`w-[220px] bg-slide-surface border rounded-3xl p-8 text-center
                ${i === 2 ? 'border-slide-accent/40 bg-slide-accent/10 slide-glow' : 'border-border'}`}>
                <step.icon className={`w-10 h-10 mx-auto mb-4 ${i === 2 ? 'text-slide-accent' : 'text-slide-gray'}`} />
                <div className="text-[24px] font-bold text-foreground mb-2">{step.label}</div>
                <div className="text-[16px] text-slide-gray-light">{step.desc}</div>
              </div>
              {i < 2 && <div className="text-[36px] text-slide-gray">+</div>}
            </motion.div>
          ))}
        </div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideDevFounder;
