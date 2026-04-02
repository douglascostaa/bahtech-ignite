import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Zap, Globe, ShoppingCart, Bot } from "lucide-react";

const SLIDE_INDEX = 24;

const services = [
    {
        icon: Globe,
        name: "Bah!Sites",
        tagline: "Presença digital que vende",
        desc: "Sites institucionais e páginas de alta conversão que fortalecem sua marca e conquistam mais clientes.",
        color: "from-orange-500 to-amber-500",
        bg: "from-orange-500/15 to-amber-500/5",
        border: "border-orange-500/30",
        iconColor: "text-orange-400",
        iconBg: "bg-orange-500/15",
        tag: "orange",
    },
    {
        icon: ShoppingCart,
        name: "Bah!Commerce",
        tagline: "Sua máquina de vendas no digital",
        desc: "Mostre sua empresa e venda mais. Construímos plataformas de e-commerce focadas em escala e conversão.",
        color: "from-cyan-500 to-blue-500",
        bg: "from-cyan-500/15 to-blue-500/5",
        border: "border-cyan-500/30",
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/15",
        tag: "cyan",
    },
    {
        icon: Bot,
        name: "Bah!Flash",
        tagline: "IA + atendimento humanizado",
        desc: "Qualificação de leads e suporte em vendas com IA — mais velocidade no processo comercial sem perder a proximidade.",
        color: "from-yellow-400 to-amber-400",
        bg: "from-yellow-500/15 to-amber-500/5",
        border: "border-yellow-500/30",
        iconColor: "text-yellow-400",
        iconBg: "bg-yellow-500/15",
        tag: "yellow",
    },
    {
        icon: Zap,
        name: "Sistemas sob medida",
        tagline: "Do problema à solução",
        desc: "Desenvolvimento de softwares, dashboards, automações e plataformas customizadas para empresas que precisam ir além.",
        color: "from-violet-500 to-purple-500",
        bg: "from-violet-500/15 to-purple-500/5",
        border: "border-violet-500/30",
        iconColor: "text-violet-400",
        iconBg: "bg-violet-500/15",
        tag: "violet",
    },
];

const SlideBahTechServicos = ({ num, total }: { num: number; total: number }) => {
    return (
        <SlideLayout>
            {/* Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slide-accent/6 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/6 blur-[160px] pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-center h-full px-[120px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slide-accent/40 to-transparent max-w-[60px]" />
                        <span className="text-slide-accent text-[17px] font-medium tracking-[0.2em] uppercase">BahTech Hoje</span>
                    </div>
                    <h2 className="font-display text-[72px] font-bold leading-[1.05] text-foreground">
                        Serviços &amp; Produtos
                    </h2>
                    <p className="text-[22px] text-slide-gray-light mt-3">
                        Do site ao software — soluções completas para empresas que querem crescer no digital
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-4 gap-5">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                            className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-3xl p-7 flex flex-col gap-5 hover:scale-[1.03] transition-transform`}
                        >
                            {/* Icon */}
                            <div className={`w-13 h-13 rounded-2xl ${s.iconBg} flex items-center justify-center w-fit p-3`}>
                                <s.icon className={`w-7 h-7 ${s.iconColor}`} />
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className={`text-[22px] font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1`}>
                                    {s.name}
                                </h3>
                                <p className="text-[14px] font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                                    {s.tagline}
                                </p>
                                <p className="text-[16px] text-slide-gray-light leading-relaxed">
                                    {s.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlideBahTechServicos;
