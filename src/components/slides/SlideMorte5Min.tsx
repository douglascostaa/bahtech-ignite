import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Clock, Search, MessageSquare } from "lucide-react";

const items = [
  { icon: Clock, label: "Horas de Call", old: "4h/dia", now: "30min" },
  { icon: Search, label: "Stack Overflow", old: "Debug manual", now: "IA resolve" },
  { icon: MessageSquare, label: "Comunicação", old: "E-mails longos", now: "Prompts precisos" },
];

const SlideMorte5Min = ({ num, total }: { num: number; total: number }) => (
  <SlideLayout>
    <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 02</div>
        <h2 className="font-display text-[72px] font-bold leading-[1.1] text-foreground mb-16">
          A Morte dos <span className="slide-gradient-text">"5 Minutinhos"</span>
        </h2>
      </motion.div>

      <div className="flex gap-8">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex-1 bg-slide-surface border border-border rounded-3xl p-10">
            <item.icon className="w-8 h-8 text-slide-accent mb-6" />
            <h3 className="text-[24px] font-semibold text-foreground mb-6">{item.label}</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[16px] text-destructive line-through">{item.old}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[20px] text-slide-accent font-semibold">{item.now}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <SlideNumber current={num} total={total} />
  </SlideLayout>
);

export default SlideMorte5Min;
