import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Trophy, ExternalLink } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const SLIDE_INDEX = 23;

const SlideData4Care = ({ num, total }: { num: number; total: number }) => {
    const subtitle = useSlideText(SLIDE_INDEX, "subtitle", "Bolsa PIBITI · UNISC");
    const desc = useSlideText(
        SLIDE_INDEX,
        "desc",
        "Pesquisa aplicada em dados de saúde com Prof. Leonel Tedesco"
    );

    return (
        <SlideLayout>
            {/* Atmospheric glows */}
            <div className="absolute top-[-80px] left-[-80px] w-[650px] h-[650px] rounded-full bg-purple-600/10 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-[-80px] right-[-80px] w-[550px] h-[550px] rounded-full bg-cyan-500/10 blur-[180px] pointer-events-none" />

            <div className="relative z-10 flex h-full px-[80px] py-[60px] gap-12">

                {/* ── LEFT COLUMN ── */}
                <div className="flex flex-col justify-between shrink-0 w-[380px]">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6"
                    >
                        {/* Badge */}
                        <div className="flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-2 w-fit">
                            <Trophy className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300 text-[15px] font-medium tracking-wide">{subtitle}</span>
                        </div>

                        {/* Logo + Title */}
                        <div className="flex items-center gap-4">
                            <img
                                src="/images/LogoD4C.png"
                                alt="Data4Care Logo"
                                className="w-[72px] h-[72px] object-contain rounded-2xl"
                            />
                            <div>
                                <h2 className="font-display text-[60px] font-bold leading-none bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
                                    Data4Care
                                </h2>
                                <p className="text-slide-gray-light text-[16px] mt-1">Projeto de Pesquisa Aplicada</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-[19px] text-slide-gray-light leading-relaxed">
                            {desc}
                        </p>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-purple-500/40 to-transparent" />

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { value: "2+", label: "Anos de pesquisa", color: "text-purple-400" },
                                { value: "2", label: "Sistemas entregues", color: "text-cyan-400" },
                                { value: "PIBITI", label: "Modalidade de bolsa", color: "text-emerald-400" },
                                { value: "UNISC", label: "Universidade", color: "text-amber-400" },
                            ].map((s, i) => (
                                <div key={i} className="bg-slide-surface border border-border rounded-2xl px-4 py-3">
                                    <div className={`text-[26px] font-bold font-display leading-none ${s.color} mb-1`}>{s.value}</div>
                                    <div className="text-[13px] text-slide-gray-light">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Bottom label */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center gap-2 text-muted-foreground text-[14px]"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>II Mostra de Extensão, Ciência e Tecnologia — UNISC</span>
                    </motion.div>
                </div>

                {/* ── RIGHT COLUMN: Image Showcase ── */}
                <div className="flex flex-col flex-1 gap-4 overflow-hidden">

                    {/* Top: VOSViewer map — large */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="relative flex-1 rounded-3xl overflow-hidden border border-purple-500/25 shadow-xl shadow-purple-500/10 group"
                    >
                        <img
                            src="/images/mapa_palavras_chaves.png"
                            alt="Mapa bibliométrico VOSViewer — wearables, IoT e saúde"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-5 right-5">
                            <span className="text-[13px] font-medium text-purple-300 uppercase tracking-widest">Revisão Sistemática</span>
                            <p className="text-white text-[16px] font-semibold mt-0.5">Mapa bibliométrico — Wearables, IoT & Saúde (VOSViewer)</p>
                        </div>
                    </motion.div>

                    {/* Bottom row: 2 screenshots */}
                    <div className="flex gap-4 h-[280px]">

                        {/* UNISC paper */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.6 }}
                            className="relative flex-1 rounded-3xl overflow-hidden border border-cyan-500/25 shadow-xl shadow-cyan-500/10 group"
                        >
                            <img
                                src="/images/image.png"
                                alt="Apresentação UNISC — Interface DPOC"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="text-[12px] font-medium text-cyan-300 uppercase tracking-widest">Interface DPOC</span>
                                <p className="text-white text-[14px] font-semibold mt-0.5 leading-snug">Visualização de dados de pacientes — II Mostra UNISC</p>
                            </div>
                        </motion.div>

                        {/* Dashboard Dengue */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="relative flex-1 rounded-3xl overflow-hidden border border-emerald-500/25 shadow-xl shadow-emerald-500/10 group"
                        >
                            <img
                                src="/images/image copy.png"
                                alt="Dashboard Dengue — Power BI"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="text-[12px] font-medium text-emerald-300 uppercase tracking-widest">Dashboard Power BI</span>
                                <p className="text-white text-[14px] font-semibold mt-0.5 leading-snug">Dashboard Dados Dengue — análise geoespacial por município</p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlideData4Care;
