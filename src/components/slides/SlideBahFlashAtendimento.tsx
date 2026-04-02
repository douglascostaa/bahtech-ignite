import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Bot, Clock, MessageSquare, RefreshCw } from "lucide-react";

const features = [
    { icon: MessageSquare, text: "Mensagens humanizadas", desc: "Respostas que parecem humanas — tom de voz natural adaptado ao lead" },
    { icon: Clock, text: "Delay calculado", desc: "Tempo de resposta simulado para não parecer automático" },
    { icon: RefreshCw, text: "Follow-up contextual", desc: "A IA retoma a conversa com contexto — sem parecer spam" },
];

const SlideBahFlashAtendimento = ({ num, total }: { num: number; total: number }) => {
    return (
        <SlideLayout>
            <div className="absolute top-[-80px] left-[-80px] w-[600px] h-[600px] rounded-full bg-yellow-500/8 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/6 blur-[160px] pointer-events-none" />

            <div className="relative z-10 flex h-full px-[80px] py-[55px] gap-14 items-center">

                {/* LEFT: info */}
                <div className="flex flex-col justify-center shrink-0 w-[440px] gap-7">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="flex items-center gap-2 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-4 py-2 w-fit mb-6">
                            <Bot className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-300 text-[14px] font-medium tracking-wide">Bah!Flash · IA em vendas</span>
                        </div>

                        <h2 className="font-display text-[62px] font-bold leading-[1.05] bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-4">
                            IA que atende<br />como gente
                        </h2>
                        <p className="text-[19px] text-slide-gray-light leading-relaxed">
                            Nossa IA qualifica leads no WhatsApp com naturalidade — enquanto o time foca no que importa.
                        </p>
                    </motion.div>

                    {/* Feature cards */}
                    <div className="flex flex-col gap-4">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                                className="flex items-start gap-4 bg-yellow-500/8 border border-yellow-500/20 rounded-2xl px-5 py-4"
                            >
                                <div className="bg-yellow-500/15 p-2.5 rounded-xl shrink-0 mt-0.5">
                                    <f.icon className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-[17px] font-semibold text-foreground">{f.text}</p>
                                    <p className="text-[14px] text-slide-gray-light mt-0.5">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: screenshots */}
                <div className="flex gap-5 flex-1 h-full py-4">
                    {["atendimento-1.png", "atendimento-2.png"].map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                            className="flex-1 relative rounded-3xl overflow-hidden border border-yellow-500/25 shadow-2xl shadow-yellow-500/10 group"
                        >
                            <img
                                src={`/images/bahflash/${img}`}
                                alt={`BahFlash atendimento ${i + 1}`}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <span className="text-yellow-300 text-[12px] font-medium uppercase tracking-widest">Lead #{i + 1}</span>
                                <p className="text-white text-[14px] font-semibold mt-0.5">Atendimento em tempo real</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlideBahFlashAtendimento;
