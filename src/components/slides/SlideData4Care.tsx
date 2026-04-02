import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Database, BarChart3, HeartPulse, FileSearch, Trophy, Users } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const SLIDE_INDEX = 23;

const highlights = [
    {
        icon: HeartPulse,
        label: "DPOC",
        desc: "Interface de visualização e análise de dados de pacientes com Doença Pulmonar Obstrutiva Crônica",
        color: "from-purple-500/20 to-violet-500/10",
        border: "border-purple-500/30",
        iconColor: "text-purple-400",
        iconBg: "bg-purple-500/15",
    },
    {
        icon: BarChart3,
        label: "Dashboard Dengue",
        desc: "Sistema de Power BI com mapas de foco, filtros epidemiológicos e análise geoespacial por município",
        color: "from-cyan-500/20 to-blue-500/10",
        border: "border-cyan-500/30",
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/15",
    },
    {
        icon: FileSearch,
        label: "Revisão Sistemática",
        desc: "Mapeamento bibliométrico via VOSViewer — wearables, IoT em saúde e sensores biomédicos",
        color: "from-emerald-500/20 to-teal-500/10",
        border: "border-emerald-500/30",
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/15",
    },
    {
        icon: Database,
        label: "ETL & Analytics",
        desc: "Coleta, tratamento e visualização de dados reais de saúde pública — do raw data ao insight",
        color: "from-amber-500/20 to-orange-500/10",
        border: "border-amber-500/30",
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/15",
    },
];

const SlideData4Care = ({ num, total }: { num: number; total: number }) => {
    const title = useSlideText(SLIDE_INDEX, "title", "Data4Care");
    const subtitle = useSlideText(SLIDE_INDEX, "subtitle", "Bolsa PIBITI · UNISC");
    const desc = useSlideText(SLIDE_INDEX, "desc", "Pesquisa aplicada em dados de saúde com Prof. Leonel Tedesco");

    return (
        <SlideLayout>
            {/* Background glows */}
            <div className="absolute top-[-100px] left-[-100px] w-[700px] h-[700px] rounded-full bg-purple-600/8 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-cyan-500/8 blur-[180px] pointer-events-none" />

            <div className="relative z-10 flex h-full px-[100px] gap-16 items-center">
                {/* Left column */}
                <div className="flex flex-col justify-center shrink-0 w-[420px]">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1.5">
                                <Trophy className="w-4 h-4 text-purple-400" />
                                <span className="text-purple-300 text-[15px] font-medium tracking-wide">{subtitle}</span>
                            </div>
                        </div>

                        {/* Logo area */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <Database className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="font-display text-[72px] font-bold leading-none bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
                                {title}
                            </h2>
                        </div>

                        <p className="text-[21px] text-slide-gray-light leading-relaxed mb-10">
                            {desc}
                        </p>

                        {/* Stats */}
                        <div className="flex gap-4">
                            <div className="bg-slide-surface border border-border rounded-2xl px-5 py-4 flex-1 text-center">
                                <div className="text-[32px] font-bold text-purple-400 font-display leading-none mb-1">2+</div>
                                <div className="text-[14px] text-slide-gray-light">Anos de pesquisa</div>
                            </div>
                            <div className="bg-slide-surface border border-border rounded-2xl px-5 py-4 flex-1 text-center">
                                <div className="text-[32px] font-bold text-cyan-400 font-display leading-none mb-1">2</div>
                                <div className="text-[14px] text-slide-gray-light">Sistemas entregues</div>
                            </div>
                            <div className="flex items-center justify-center bg-slide-surface border border-border rounded-2xl px-4 py-4 flex-1 gap-2">
                                <Users className="w-5 h-5 text-emerald-400 shrink-0" />
                                <div className="text-[14px] text-slide-gray-light leading-tight">Prof. Leonel Tedesco</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right column — cards */}
                <div className="grid grid-cols-2 gap-4 flex-1">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                            className={`bg-gradient-to-br ${item.color} border ${item.border} rounded-3xl p-7 flex flex-col gap-4 hover:scale-[1.02] transition-transform`}
                        >
                            <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                            </div>
                            <div>
                                <h3 className="text-[22px] font-semibold text-foreground mb-2">{item.label}</h3>
                                <p className="text-[16px] text-slide-gray-light leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlideData4Care;
