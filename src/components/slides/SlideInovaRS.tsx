import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { MapPin, Heart, Award, Users } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const SLIDE_INDEX = 26;

const SlideInovaRS = ({ num, total }: { num: number; total: number }) => {
    const title = useSlideText(SLIDE_INDEX, "title", "MIVA");
    const subtitle = useSlideText(SLIDE_INDEX, "subtitle", "Memorial das Inundações · Região dos Vales");
    const desc = useSlideText(
        SLIDE_INDEX,
        "desc",
        "Plataforma digital criada para o Inova RS — memorial interativo das inundações que devastaram a região. Um projeto que tocou de perto nossa empresa e nosso time."
    );

    return (
        <SlideLayout>
            {/* Atmospheric glow — tons de azul/verde remetendo à água */}
            <div className="absolute top-[-60px] right-[-60px] w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-[-60px] left-[-60px] w-[500px] h-[500px] rounded-full bg-emerald-600/8 blur-[160px] pointer-events-none" />

            <div className="relative z-10 flex h-full px-[70px] py-[55px] gap-10">

                {/* ── LEFT COLUMN ── */}
                <div className="flex flex-col justify-between shrink-0 w-[400px]">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-5"
                    >
                        {/* Badges */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 rounded-full px-4 py-2 w-fit">
                                <Award className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-300 text-[14px] font-medium">Inova RS · South Summit 2024</span>
                            </div>
                            <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-4 py-2 w-fit">
                                <MapPin className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-300 text-[14px] font-medium">{subtitle}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <h2 className="font-display text-[72px] font-bold leading-none bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-3">
                                {title}
                            </h2>
                            <p className="text-[19px] text-slide-gray-light leading-relaxed">
                                {desc}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-blue-500/40 to-transparent" />

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: Heart, value: "RS", label: "Estado afetado", color: "text-red-400", iconBg: "bg-red-500/15" },
                                { icon: Award, value: "Inova RS", label: "Programa de apoio", color: "text-blue-400", iconBg: "bg-blue-500/15" },
                                { icon: MapPin, value: "Vales", label: "Região impactada", color: "text-emerald-400", iconBg: "bg-emerald-500/15" },
                                { icon: Users, value: "BahTech", label: "Empresa parceira", color: "text-slide-accent", iconBg: "bg-slide-accent/15" },
                            ].map((s, i) => (
                                <div key={i} className="bg-slide-surface border border-border rounded-2xl px-4 py-3 flex items-center gap-3">
                                    <div className={`${s.iconBg} p-2 rounded-xl`}>
                                        <s.icon className={`w-4 h-4 ${s.color}`} />
                                    </div>
                                    <div>
                                        <div className={`text-[15px] font-bold ${s.color} leading-none`}>{s.value}</div>
                                        <div className="text-[12px] text-slide-gray-light mt-0.5">{s.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* South Summit photo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="relative rounded-3xl overflow-hidden border border-blue-500/25 shadow-xl shadow-blue-500/10"
                        style={{ height: "260px" }}
                    >
                        <img
                            src="/images/IMG_1677.jpeg"
                            alt="BahTech com as idealizadoras do Inova RS no South Summit"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4">
                            <p className="text-white text-[13px] font-medium leading-snug">
                                🤝 Com as idealizadoras do Inova RS — South Summit 2024
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ── RIGHT COLUMN: Images ── */}
                <div className="flex flex-col flex-1 gap-4 overflow-hidden">

                    {/* Main image: MIVA app */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="relative flex-1 rounded-3xl overflow-hidden border border-blue-500/25 shadow-xl shadow-blue-500/10 group"
                    >
                        <img
                            src="/images/SCR-20260402-necy.jpeg"
                            alt="MIVA — plataforma memorial das inundações"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-5 right-5">
                            <span className="text-[13px] font-medium text-blue-300 uppercase tracking-widest">Plataforma MIVA</span>
                            <p className="text-white text-[16px] font-semibold mt-0.5">Memorial interativo das inundações na Região dos Vales</p>
                        </div>
                    </motion.div>

                    {/* Bottom row: 2 images */}
                    <div className="flex gap-4 h-[240px]">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.6 }}
                            className="relative flex-1 rounded-3xl overflow-hidden border border-emerald-500/25 shadow-xl group"
                        >
                            <img
                                src="/images/image copy 2.png"
                                alt="MIVA — detalhe do projeto"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                            <div className="absolute bottom-3 left-4">
                                <p className="text-white text-[13px] font-semibold">Interface do Projeto</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="relative flex-1 rounded-3xl overflow-hidden border border-blue-500/25 shadow-xl group"
                        >
                            <img
                                src="/images/image copy 3.png"
                                alt="MIVA — contexto das inundações RS"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                            <div className="absolute bottom-3 left-4">
                                <p className="text-white text-[13px] font-semibold">Contexto das Inundações — RS 2024</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlideInovaRS;
