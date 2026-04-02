import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const SlidePersonalidade = ({ num, total }: { num: number; total: number }) => {
    const eyebrow = useSlideText(29, "eyebrow", "Módulo 01 · Antes de começar");
    const title = useSlideText(29, "title", "Quem sou eu e por que<br />estou sempre buscando mais");
    const desc = useSlideText(29, "desc", "Tenho um medo genuíno de ficar pra trás — e isso me faz buscar, estudar e construir sem parar.");

    return (
        <SlideLayout>
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-slide-accent/5 blur-[200px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-start justify-center h-full px-[160px] max-w-[1000px]">

                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-slide-accent text-[17px] font-medium tracking-[0.25em] uppercase mb-8"
                >
                    {eyebrow}
                </motion.p>

                {/* Main title */}
                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7 }}
                    className="font-display text-[86px] font-bold leading-[1.08] text-foreground mb-10"
                    dangerouslySetInnerHTML={{ __html: title.replace('estou sempre buscando mais', '<span class="bg-gradient-to-r from-slide-accent to-cyan-400 bg-clip-text text-transparent">estou sempre buscando mais</span>') }}
                />

                {/* Minimal description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.6 }}
                    className="text-[26px] text-slide-gray-light leading-relaxed max-w-[760px]"
                >
                    {desc}
                </motion.p>

            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlidePersonalidade;
