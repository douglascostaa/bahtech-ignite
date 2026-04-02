import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const myths = [
  { myth: '"Preciso de diploma pra começar"', reality: "Portfólio > Diploma" },
  { myth: '"IA vai substituir devs"', reality: "IA substitui tarefas, não pensadores" },
  { myth: '"Preciso saber tudo antes de começar"', reality: "Comece. Aprenda no caminho." },
];

const SlideMitos = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(20, "title", "Mitos Destruídos");

  return (
    <SlideLayout>
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          <h2 className="font-display text-[80px] font-bold leading-[1.1] text-foreground mb-16">{title}</h2>
        </motion.div>
        <div className="flex flex-col gap-6">
          {myths.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex items-center gap-8 bg-slide-surface border border-border rounded-2xl p-8">
              <div className="flex-1">
                <span className="text-[22px] text-destructive line-through">{m.myth}</span>
              </div>
              <div className="text-[28px] text-slide-gray mx-4">→</div>
              <div className="flex-1">
                <span className="text-[22px] text-slide-accent font-semibold">{m.reality}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideMitos;
