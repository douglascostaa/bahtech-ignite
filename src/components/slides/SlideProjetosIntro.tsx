import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Rocket, Code2, Layers } from "lucide-react";

const SLIDE_INDEX = 25;

const highlights = [
    { icon: Code2, text: "Produtos digitais reais" },
    { icon: Layers, text: "Do conceito à entrega" },
    { icon: Rocket, text: "Impacto comprovado" },
];

const SlideProjetosIntro = ({ num, total }: { num: number; total: number }) => {
    return (
        <SlideLayout>
            {/* Atmospheric glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-slide-accent/6 blur-[200px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-[160px] gap-10">

                {/* Logo BahTech */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="bg-slide-surface border border-border rounded-3xl p-8 shadow-2xl shadow-slide-accent/10">
                        <img
                            src="/images/bahtech_logotipo_positivo (1).png"
                            alt="BahTech"
                            className="h-[80px] object-contain"
                        />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    className="flex flex-col gap-4"
                >
                    <p className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase">
                        A BahTech em ação
                    </p>
                    <h2 className="font-display text-[80px] font-bold leading-[1.05] text-foreground">
                        Projetos que a gente<br />
                        <span className="bg-gradient-to-r from-slide-accent to-cyan-400 bg-clip-text text-transparent">
                            construiu de verdade
                        </span>
                    </h2>
                    <p className="text-[24px] text-slide-gray-light leading-relaxed max-w-[900px] mx-auto">
                        Cada projeto aqui resolveu um problema real — com tech, criatividade e muito trabalho.
                    </p>
                </motion.div>

                {/* Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="flex items-center gap-4"
                >
                    {highlights.map((h, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 bg-slide-surface border border-border rounded-full px-6 py-3"
                        >
                            <h.icon className="w-5 h-5 text-slide-accent" />
                            <span className="text-[17px] text-foreground font-medium">{h.text}</span>
                        </div>
                    ))}
                </motion.div>

            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlideProjetosIntro;
