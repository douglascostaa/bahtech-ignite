import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import heroBg from "@/assets/hero-bg.jpg";

const SlideConclusao = ({ num, total }: { num: number; total: number }) => (
  <SlideLayout>
    <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" width={1920} height={1080} />
    <div className="absolute inset-0 bg-gradient-to-t from-slide-bg via-slide-bg/70 to-transparent" />
    <div className="relative z-10 flex items-center justify-center h-full px-[140px]">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} className="text-center">
        <h2 className="font-display text-[96px] font-bold leading-[1.05] text-foreground mb-8">
          O futuro é de<br/>quem <span className="slide-gradient-text">constrói</span>
        </h2>
        <p className="text-[28px] text-slide-gray-light mb-16">
          @bahtech • bahtech.com.br
        </p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-flex flex-col items-center gap-4 bg-foreground/10 backdrop-blur-sm border border-foreground/20 rounded-3xl p-10">
          <div className="w-[180px] h-[180px] bg-foreground rounded-2xl flex items-center justify-center">
            <div className="text-background text-[16px] font-mono text-center px-4">
              QR CODE<br/>Instagram<br/>@bahtech
            </div>
          </div>
          <span className="text-[18px] text-slide-gray-light">Escaneie para conectar</span>
        </motion.div>
      </motion.div>
    </div>
    <SlideNumber current={num} total={total} />
  </SlideLayout>
);

export default SlideConclusao;
