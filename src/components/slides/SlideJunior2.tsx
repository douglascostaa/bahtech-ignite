import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { TrendingUp } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const SlideJunior2 = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(11, "title", "O Júnior 2.0");

  return (
    <SlideLayout>
      <div className="relative z-10 flex items-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 02</div>
          <h2 className="font-display text-[80px] font-bold leading-[1.1] text-foreground mb-8">{title}</h2>
          <p className="text-[26px] text-slide-gray-light leading-relaxed max-w-[600px]">
            A régua subiu. O mercado exige mais,<br/>mas a IA permite entregar como<br/>Pleno desde o início.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }} className="flex-1 flex justify-center">
          <div className="relative">
            <div className="w-[400px] h-[400px] rounded-full bg-slide-accent/10 border border-slide-accent/20 flex items-center justify-center">
              <div className="w-[280px] h-[280px] rounded-full bg-slide-accent/15 border border-slide-accent/30 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-slide-accent mx-auto mb-4" />
                  <div className="text-[20px] text-foreground font-semibold">Nível de entrega</div>
                  <div className="text-[48px] font-display font-bold slide-gradient-text">10x</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideJunior2;
