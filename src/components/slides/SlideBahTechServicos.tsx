import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Zap, Globe, ShoppingCart, Bot, Calendar, Store } from "lucide-react";

const services = [
    {
        icon: Globe,
        name: "Bah!Sites",
        tagline: "Sites que vendem",
        desc: "Sites institucionais e páginas de alta conversão que fortalecem a marca e conquistam mais clientes.",
        bg: "from-orange-500/15 to-amber-500/5",
        border: "border-orange-500/30",
        iconColor: "text-orange-400",
        iconBg: "bg-orange-500/15",
        nameColor: "from-orange-500 to-amber-400",
    },
    {
        icon: ShoppingCart,
        name: "Bah!Commerce",
        tagline: "Máquina de vendas no digital",
        desc: "Plataformas de e-commerce focadas em escala, conversão e crescimento no ambiente digital.",
        bg: "from-cyan-500/15 to-blue-500/5",
        border: "border-cyan-500/30",
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/15",
        nameColor: "from-cyan-500 to-blue-400",
    },
    {
        icon: Bot,
        name: "Bah!Flash",
        tagline: "IA + atendimento humanizado",
        desc: "Qualificação de leads e suporte em vendas com IA — velocidade comercial sem perder a proximidade.",
        bg: "from-yellow-500/15 to-amber-500/5",
        border: "border-yellow-500/30",
        iconColor: "text-yellow-400",
        iconBg: "bg-yellow-500/15",
        nameColor: "from-yellow-400 to-amber-400",
    },
    {
        icon: Calendar,
        name: "Bah!Agenda",
        tagline: "Agendamento inteligente",
        desc: "Sistema online que organiza horários, reservas e atendimentos — simples, eficiente e sem complicação.",
        bg: "from-emerald-500/15 to-teal-500/5",
        border: "border-emerald-500/30",
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/15",
        nameColor: "from-emerald-500 to-teal-400",
    },
    {
        icon: Store,
        name: "Bah!Vitrine",
        tagline: "Sua loja no mundo digital",
        desc: "Vitrine online aberta 24/7 — venda mais além do espaço físico, com visibilidade e comodidade para seus clientes.",
        bg: "from-pink-500/15 to-rose-500/5",
        border: "border-pink-500/30",
        iconColor: "text-pink-400",
        iconBg: "bg-pink-500/15",
        nameColor: "from-pink-500 to-rose-400",
    },
    {
        icon: Zap,
        name: "Sistemas sob medida",
        tagline: "Do problema à solução",
        desc: "Softwares, dashboards e automações customizadas para empresas que precisam ir além do padrão.",
        bg: "from-violet-500/15 to-purple-500/5",
        border: "border-violet-500/30",
        iconColor: "text-violet-400",
        iconBg: "bg-violet-500/15",
        nameColor: "from-violet-500 to-purple-400",
    },
];

const SlideBahTechServicos = ({ num, total }: { num: number; total: number }) => {
    return (
        <SlideLayout>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slide-accent/6 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/6 blur-[160px] pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-center h-full px-[100px] py-[50px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-9"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-slide-accent text-[16px] font-medium tracking-[0.2em] uppercase">BahTech</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="font-display text-[62px] font-bold leading-[1.05] text-foreground">
                                Serviços &amp; Produtos
                            </h2>
                            <p className="text-[19px] text-slide-gray-light mt-2">
                                Soluções completas para empresas que querem crescer no digital
                            </p>
                        </div>
                        <div className="text-right text-slide-gray-light text-[15px] pb-1">
                            <span className="bg-slide-surface border border-border rounded-full px-4 py-1.5">6 soluções</span>
                        </div>
                    </div>
                </motion.div>

                {/* 3x2 Grid */}
                <div className="grid grid-cols-3 gap-4">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                            className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-3xl p-6 flex gap-4 items-start hover:scale-[1.02] transition-transform`}
                        >
                            <div className={`${s.iconBg} p-3 rounded-2xl shrink-0 mt-0.5`}>
                                <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                            </div>
                            <div>
                                <h3 className={`text-[20px] font-bold bg-gradient-to-r ${s.nameColor} bg-clip-text text-transparent leading-tight`}>
                                    {s.name}
                                </h3>
                                <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
                                    {s.tagline}
                                </p>
                                <p className="text-[14px] text-slide-gray-light leading-relaxed">
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
