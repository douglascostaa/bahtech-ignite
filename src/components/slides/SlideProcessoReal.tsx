import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { ArrowRight, RefreshCw } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const roles = [
  { label: "Product\nManagers", gradient: "from-blue-400 to-purple-500" },
  { label: "Designers", gradient: "from-purple-400 to-pink-500" },
  { label: "Developers", gradient: "from-pink-500 to-orange-500" },
];

const SlideProcessoReal = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(8, "title", "O Processo Real de Software");

  return (
    <SlideLayout>
      <div className="relative z-10 flex flex-col h-full px-[140px] py-[80px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
          <h3 className="text-[28px] text-slide-gray-light font-light mb-10">
            Como as pessoas acham que é a construção de software
          </h3>
          <div className="flex items-center justify-center gap-12">
            {roles.map((role, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.15 }} className="flex items-center gap-8">
                <div className={`w-[200px] h-[200px] rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-2xl`}>
                  <span className="text-[22px] font-bold text-white text-center whitespace-pre-line leading-tight">{role.label}</span>
                </div>
                {i < 2 && <ArrowRight className="w-10 h-10 text-white/60" />}
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="w-full h-px bg-border my-6" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }} className="flex-1">
          <h3 className="text-[28px] text-slide-gray-light font-light mb-10">
            Como ela <span className="text-foreground font-semibold">realmente</span> é
          </h3>
          <div className="flex items-center justify-center gap-6">
            {roles.map((role, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.15 }} className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-[180px] h-[180px] rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-2xl`}>
                    <span className="text-[20px] font-bold text-white text-center whitespace-pre-line leading-tight">{role.label}</span>
                  </div>
                  <RefreshCw className="absolute -top-4 -right-2 w-7 h-7 text-white/70" />
                </div>
                {i < 2 && (
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight className="w-7 h-7 text-white/60" />
                    <ArrowRight className="w-7 h-7 text-white/60 rotate-180" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[18px] text-slide-gray mt-8">
            Feedback loops, iteração constante, comunicação contínua entre todos os papéis
          </p>
        </motion.div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideProcessoReal;
