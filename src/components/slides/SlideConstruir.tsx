import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Quote } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const SlideConstruir = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(10, "title", "A construção é a nova forma de comunicação");

  return (
    <SlideLayout>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10" />
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-8">Módulo 02</div>
          <h2 className="font-display text-[76px] font-bold leading-[1.05] text-foreground mb-16">{title}</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }} className="max-w-[900px]">
          <div className="bg-slide-surface border border-border rounded-3xl p-12 relative">
            <Quote className="w-10 h-10 text-slide-accent/30 absolute top-8 right-8" />

            <div className="space-y-6">
              <p className="text-[22px] text-foreground leading-relaxed">
                "No Google, estamos passando de uma cultura de <span className="text-slide-accent font-semibold">"escrever primeiro"</span> para uma de <span className="text-slide-accent font-semibold">"construir primeiro"</span>."
              </p>
              <p className="text-[20px] text-slide-gray-light leading-relaxed">
                Quando o tempo para prototipar em vibe-code ≈ o tempo para escrever um PRD, PMs podem <span className="text-foreground font-medium">mostrar</span>, não apenas dizer.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideConstruir;
