import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { BarChart3, Activity, Bot } from "lucide-react";

const stats = [
    { value: "100%", label: "Monitorados", color: "text-yellow-400" },
    { value: "Real-time", label: "Dados ao vivo", color: "text-amber-400" },
    { value: "IA + CRM", label: "Integrado", color: "text-orange-400" },
];

const SlideBahFlashDashboard = ({ num, total }: { num: number; total: number }) => {
    return (
        <SlideLayout>
            <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-amber-500/8 blur-[200px] pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full px-[80px] py-[50px] gap-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start justify-between shrink-0"
                >
                    <div>
                        <div className="flex items-center gap-2 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-4 py-1.5 w-fit mb-3">
                            <Activity className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-300 text-[14px] font-medium">Bah!Flash · Monitoramento</span>
                        </div>
                        <h2 className="font-display text-[52px] font-bold leading-[1.05] bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                            IA integrada a um dashboard<br />em tempo real
                        </h2>
                        <p className="text-[17px] text-slide-gray-light mt-2">
                            Cada lead, mensagem e atendimento visível — para decisões mais rápidas.
                        </p>
                    </div>
                    <div className="flex gap-3 shrink-0 ml-8 mt-1">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="bg-slide-surface border border-border rounded-2xl px-5 py-3 text-center min-w-[110px]"
                            >
                                <div className={`text-[20px] font-bold font-display ${s.color} leading-none mb-1`}>{s.value}</div>
                                <div className="text-[12px] text-slide-gray-light">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Dashboard screenshots — object-contain, full size visible */}
                <div className="flex gap-5 flex-1 overflow-hidden">
                    {["dashboard-1.png", "dashboard-2.png"].map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 + i * 0.15, duration: 0.6 }}
                            className="flex-1 flex flex-col items-center justify-center bg-slide-surface rounded-3xl border border-yellow-500/25 shadow-2xl shadow-yellow-500/10 overflow-hidden p-4"
                        >
                            <img
                                src={`/images/bahflash/${img}`}
                                alt={`BahFlash dashboard ${i + 1}`}
                                className="max-w-full max-h-full object-contain rounded-2xl"
                            />
                            <div className="flex items-center gap-2 mt-2 opacity-70">
                                {i === 0 ? <BarChart3 className="w-3.5 h-3.5 text-yellow-400" /> : <Bot className="w-3.5 h-3.5 text-yellow-400" />}
                                <span className="text-yellow-300 text-[11px] font-medium uppercase tracking-widest">
                                    {i === 0 ? "Visão geral" : "Leads & funil"}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlideBahFlashDashboard;
