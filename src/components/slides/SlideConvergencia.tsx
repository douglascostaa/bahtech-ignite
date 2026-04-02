import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const SlideConvergencia = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(9, "title", "A Convergência dos Papéis");

  return (
    <SlideLayout>
      <div className="relative z-10 flex items-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1 pr-16">
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 02</div>
          <h2 className="font-display text-[68px] font-bold leading-[1.1] text-foreground mb-8">{title}</h2>
          <p className="text-[24px] text-slide-gray-light leading-relaxed mb-8">
            Com ferramentas de IA, as fronteiras entre<br/>
            Product Manager, Designer e Developer<br/>
            estão se dissolvendo.
          </p>
          <p className="text-[20px] text-slide-gray leading-relaxed">
            Um único profissional pode prototipar,<br/>
            validar e lançar — se souber usar as<br/>
            ferramentas certas.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }} className="flex-1 flex items-center justify-center">
          <div className="relative w-[600px] h-[550px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-pink-500/80 to-red-600/80 flex items-center justify-center backdrop-blur-sm">
              <span className="text-[28px] font-bold text-white mt-[-30px]">Developers</span>
            </div>
            <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-blue-400/80 to-purple-500/80 flex items-center justify-center backdrop-blur-sm">
              <span className="text-[24px] font-bold text-white text-center mt-[40px] ml-[-20px]">Product<br/>Managers</span>
            </div>
            <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-purple-400/80 to-pink-500/80 flex items-center justify-center backdrop-blur-sm">
              <span className="text-[26px] font-bold text-white mt-[40px] mr-[-20px]">Designers</span>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[30px]">
              <div className="w-[80px] h-[80px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <span className="text-[14px] font-bold text-white text-center">IA</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideConvergencia;
