import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Compass, Zap, Eye, TrendingUp } from "lucide-react";

const traits = [
    {
        icon: Eye,
        title: "Sempre de olho no mercado",
        desc: "Tecnologia muda rápido. Ficar parado é ficar pra trás — isso me move todo dia.",
        color: "text-slide-accent",
        border: "border-slide-accent/30",
        bg: "bg-slide-accent/10",
    },
    {
        icon: Zap,
        title: "Velocidade de execução",
        desc: "Não espero tudo estar perfeito para começar. Aprendo fazendo — e corrijo em movimento.",
        color: "text-yellow-400",
        border: "border-yellow-500/30",
        bg: "bg-yellow-500/10",
    },
    {
        icon: TrendingUp,
        title: "Fome de crescimento",
        desc: "Não é ambição por vaidade. É medo genuíno de desperdiçar o potencial que o momento oferece.",
        color: "text-emerald-400",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/10",
    },
    {
        icon: Compass,
        title: "Bússola interna sempre ligada",
        desc: "Curioso por natureza — se tem algo novo em tech, IA ou negócios, eu já estou estudando.",
        color: "text-violet-400",
        border: "border-violet-500/30",
        bg: "bg-violet-500/10",
    },
];

const SlidePersonalidade = ({ num, total }: { num: number; total: number }) => {
    return (
        <SlideLayout>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-slide-accent/6 blur-[200px] pointer-events-none" />

            <div className="relative z-10 flex h-full px-[120px] gap-16 items-center">

                {/* LEFT */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="shrink-0 w-[480px]"
                >
                    <div className="text-slide-accent text-[17px] font-medium tracking-[0.2em] uppercase mb-6">
                        Módulo 01 · Quem sou eu
                    </div>

                    <h2 className="font-display text-[68px] font-bold leading-[1.05] text-foreground mb-6">
                        Uma mente que não<br />
                        <span className="bg-gradient-to-r from-slide-accent to-cyan-400 bg-clip-text text-transparent">
                            consegue parar.
                        </span>
                    </h2>

                    <p className="text-[20px] text-slide-gray-light leading-relaxed mb-8">
                        Não é workaholic — é inquietude criativa. Tenho um medo saudável de ficar pra trás que me faz buscar, estudar e construir sem parar.
                    </p>

                    {/* Quote */}
                    <div className="border-l-4 border-slide-accent pl-6 py-2">
                        <p className="text-[18px] text-foreground italic leading-relaxed">
                            "O mercado não espera. Então eu também não espero."
                        </p>
                        <p className="text-[15px] text-slide-gray-light mt-2">— Douglas Costa</p>
                    </div>
                </motion.div>

                {/* RIGHT: trait cards */}
                <div className="grid grid-cols-2 gap-4 flex-1">
                    {traits.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                            className={`${t.bg} border ${t.border} rounded-3xl p-7 flex flex-col gap-4`}
                        >
                            <div className={`${t.bg} p-3 rounded-2xl w-fit border ${t.border}`}>
                                <t.icon className={`w-6 h-6 ${t.color}`} />
                            </div>
                            <div>
                                <h3 className={`text-[20px] font-bold ${t.color} mb-2`}>{t.title}</h3>
                                <p className="text-[15px] text-slide-gray-light leading-relaxed">{t.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlidePersonalidade;
