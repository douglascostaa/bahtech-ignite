import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const SlideModuloDivider = ({ num, total, module, title, subtitle, slideIndex }: { num: number; total: number; module: string; title: string; subtitle: string; slideIndex: number }) => {
  const moduleText = useSlideText(slideIndex, "module", module);
  const titleText = useSlideText(slideIndex, "title", title);
  const subtitleText = useSlideText(slideIndex, "subtitle", subtitle);

  return (
    <SlideLayout>
      <div className="absolute inset-0 bg-gradient-to-br from-slide-accent/10 via-slide-bg to-slide-bg" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-[140px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="text-slide-accent text-[20px] font-medium tracking-[0.3em] uppercase mb-8">{moduleText}</div>
          <h2 className="font-display text-[96px] font-bold leading-[1.05] text-foreground mb-6">{titleText}</h2>
          <p className="text-[28px] text-slide-gray-light font-light">{subtitleText}</p>
        </motion.div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideModuloDivider;
