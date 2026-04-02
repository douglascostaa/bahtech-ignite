import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { useSlideText } from "@/contexts/SlideOverridesContext";
import heroBg from "@/assets/hero-bg.jpg";

const SlideCover = ({ total }: { total: number }) => {
  const subtitle = useSlideText(0, "subtitle", "BahTech • 2025");
  const title = useSlideText(0, "title", "Do Código ao CNPJ");
  const desc = useSlideText(0, "desc", "Construindo a BahTech");
  const author = useSlideText(0, "author", "Douglas Costa");
  const role = useSlideText(0, "role", "CEO & Founder, BahTech");

  return (
    <SlideLayout>
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-t from-slide-bg via-slide-bg/80 to-transparent" />
      
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="text-slide-accent text-[22px] font-medium tracking-[0.3em] uppercase mb-8">
            {subtitle}
          </div>
          <h1 className="font-display text-[96px] font-bold leading-[1.05] mb-8 text-foreground">
            {title}
          </h1>
          <p className="text-[28px] text-slide-gray-light font-light max-w-[700px]">
            {desc}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-[100px] left-[140px]">
          <div className="flex items-center gap-6">
            <div className="w-[56px] h-[56px] rounded-full bg-slide-accent/20 border border-slide-accent/30 flex items-center justify-center text-slide-accent text-[20px] font-bold">
              {author.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <div className="text-foreground text-[20px] font-medium">{author}</div>
              <div className="text-slide-gray text-[16px]">{role}</div>
            </div>
          </div>
        </motion.div>
      </div>

      <SlideNumber current={1} total={total} />
    </SlideLayout>
  );
};

export default SlideCover;
