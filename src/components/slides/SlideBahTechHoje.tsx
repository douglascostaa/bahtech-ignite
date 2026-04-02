import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { useSlideText } from "@/contexts/SlideOverridesContext";
import brazilMap from "@/assets/brazil-map.png";

const tags = ["IA", "SaaS", "Automação", "Web", "Mobile", "Data"];

const SlideBahTechHoje = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(5, "title", "BahTech Hoje");
  const stat = useSlideText(5, "stat", "21");

  return (
    <SlideLayout>
      <div className="relative z-10 flex items-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          className="flex-1">
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 01</div>
          <h2 className="font-display text-[80px] font-bold leading-[1.1] text-foreground mb-6">{title}</h2>
          <div className="flex items-baseline gap-3 mb-10">
            <span className="text-[72px] font-display font-bold slide-gradient-text">{stat}</span>
            <span className="text-[28px] text-slide-gray-light">estados atendidos</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, i) => (
              <motion.span key={tag} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="px-6 py-3 rounded-full bg-slide-accent/10 border border-slide-accent/20 text-slide-accent text-[18px] font-medium">
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }} className="flex-1 flex justify-center">
          <img src={brazilMap} alt="Mapa do Brasil" className="w-[500px] h-[500px] object-contain" loading="lazy" width={1024} height={1024} />
        </motion.div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideBahTechHoje;
