import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Bot, Clock, MessageSquare, RefreshCw } from "lucide-react";

import { useSlideText } from "@/contexts/SlideOverridesContext";

const features = [
    { icon: MessageSquare, text: "Mensagens humanizadas", desc: "Respostas naturais — tom de voz adaptado ao lead" },
    { icon: Clock, text: "Delay calculado", desc: "Tempo de resposta simulado para não parecer automático" },
    { icon: RefreshCw, text: "Follow-up contextual", desc: "A IA retoma a conversa com contexto — sem parecer spam" },
];

const SlideBahFlashAtendimento = ({ num, total }: { num: number; total: number }) => {
    const title = useSlideText(26, "title", "IA que atende<br />como gente");
    const desc = useSlideText(26, "desc", "Nossa IA qualifica leads no WhatsApp com naturalidade — enquanto o time foca no que importa.");

    return (
        <SlideLayout>
            <div className="absolute top-[-80px] left-[-80px] w-[600px] h-[600px] rounded-full bg-yellow-500/8 blur-[180px] pointer-events-none" />

            <div className="relative z-10 flex h-full px-[80px] py-[55px] gap-12 items-center">

                {/* LEFT: info */}
                <div className="flex flex-col justify-center shrink-0 w-[420px] gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-2 bg-yellow-500/15 border border-yellow-500/30 rounded-full px-4 py-2 w-fit mb-6">
                            <Bot className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-300 text-[14px] font-medium tracking-wide">Bah!Flash · IA em vendas</span>
                        </div>
                        <h2
                            className="font-display text-[56px] font-bold leading-[1.05] bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-4"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                        <p className="text-[18px] text-slide-gray-light leading-relaxed">
                            {desc}
                        </p>
                    </motion.div>

                    <div className="flex flex-col gap-3">
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
                                    <p className="text-[16px] font-semibold text-foreground">{f.text}</p>
                                    <p className="text-[13px] text-slide-gray-light mt-0.5">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: screenshots — object-contain to show full image */}
                <div className="flex gap-5 flex-1 h-full py-2">
                    {["atendimento-2.png", "atendimento-1.png"].map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                            className="flex-1 flex flex-col items-center justify-center bg-slide-surface rounded-3xl border border-yellow-500/25 shadow-2xl shadow-yellow-500/10 overflow-hidden p-3"
                        >
                            <img
                                src={`/images/bahflash/${img}`}
                                alt={`BahFlash atendimento ${i + 1}`}
                                className="max-w-full max-h-full object-contain rounded-2xl"
                                style={{ objectFit: "contain" }}
                            />
                            <span className="text-yellow-300 text-[11px] font-medium uppercase tracking-widest mt-2 opacity-70">
                                Lead #{i + 1}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlideBahFlashAtendimento;
