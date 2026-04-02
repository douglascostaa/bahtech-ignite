import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const timeline = [
  { year: "Agora", action: "Escolha 1 tecnologia. Domine." },
  { year: "3 meses", action: "Construa 1 projeto real." },
  { year: "6 meses", action: "Publique. Compartilhe. Conecte." },
  { year: "1 ano", action: "Você já está diferente de 90%." },
];

const SlideRoadmap = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(21, "title", "Seu Roadmap Pessoal");

  return (
    <SlideLayout>
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Bônus</div>
          <h2 className="font-display text-[72px] font-bold leading-[1.1] text-foreground mb-16">{title}</h2>
        </motion.div>
        <div className="relative flex items-center gap-6">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-slide-accent/50 to-slide-accent/10" />
          {timeline.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="relative flex-1 bg-slide-surface border border-border rounded-3xl p-8 z-10">
              <div className="absolute -top-3 left-8 px-4 py-1 bg-slide-accent rounded-full text-[14px] font-bold text-foreground">
                {t.year}
              </div>
              <div className="text-[22px] text-foreground font-medium mt-4">{t.action}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideRoadmap;
