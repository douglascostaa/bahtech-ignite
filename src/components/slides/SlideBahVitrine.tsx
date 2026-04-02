import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Store, ShoppingBag, Eye, Clock } from "lucide-react";

const features = [
    { icon: Eye, text: "Visibilidade 24/7", desc: "Vitrine online sempre aberta — mesmo quando a loja física está fechada" },
    { icon: ShoppingBag, text: "Catálogo digital", desc: "Produtos organizados e acessíveis por qualquer dispositivo" },
    { icon: Clock, text: "Porta de entrada", desc: "Para pequenos negócios prontos para crescer, mas que ainda não estão no BahCommerce" },
];

const SlideBahVitrine = ({ num, total }: { num: number; total: number }) => {
    return (
        <SlideLayout>
            <div className="absolute top-[-60px] right-[-60px] w-[600px] h-[600px] rounded-full bg-pink-500/8 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-rose-500/6 blur-[160px] pointer-events-none" />

            <div className="relative z-10 flex h-full px-[80px] py-[55px] gap-12 items-center">

                {/* LEFT */}
                <div className="flex flex-col justify-center shrink-0 w-[420px] gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-2 bg-pink-500/15 border border-pink-500/30 rounded-full px-4 py-2 w-fit mb-6">
                            <Store className="w-4 h-4 text-pink-400" />
                            <span className="text-pink-300 text-[14px] font-medium tracking-wide">Produto Digital · BahTech</span>
                        </div>

                        <h2 className="font-display text-[64px] font-bold leading-[1.05] bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-4">
                            Bah!Vitrine
                        </h2>
                        <p className="text-[19px] text-slide-gray-light leading-relaxed mb-2">
                            Nasceu de uma dor real: muitos clientes queriam o BahCommerce, mas o caixa não alcançava.
                        </p>
                        <p className="text-[19px] text-slide-gray-light leading-relaxed">
                            A Bah!Vitrine é a porta de entrada — uma loja digital simples, acessível e que já gera resultado.
                        </p>
                    </motion.div>

                    <div className="flex flex-col gap-3">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                                className="flex items-start gap-4 bg-pink-500/8 border border-pink-500/20 rounded-2xl px-5 py-4"
                            >
                                <div className="bg-pink-500/15 p-2.5 rounded-xl shrink-0 mt-0.5">
                                    <f.icon className="w-5 h-5 text-pink-400" />
                                </div>
                                <div>
                                    <p className="text-[16px] font-semibold text-foreground">{f.text}</p>
                                    <p className="text-[13px] text-slide-gray-light mt-0.5">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: screenshots */}
                <div className="flex gap-4 flex-1 h-full py-2">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex-1 relative rounded-3xl overflow-hidden border border-pink-500/25 shadow-2xl shadow-pink-500/10 group"
                    >
                        <img
                            src="/images/bahvitrine/2026-04-02_15-01-34.png"
                            alt="Bah!Vitrine — plataforma"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <span className="text-pink-300 text-[12px] uppercase tracking-widest font-medium">Catálogo digital</span>
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-4 w-[42%]">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.6 }}
                            className="flex-1 relative rounded-3xl overflow-hidden border border-rose-500/25 shadow-xl group"
                        >
                            <img
                                src="/images/bahvitrine/2026-04-02_15-03-08.png"
                                alt="Bah!Vitrine — produto"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex-1 relative rounded-3xl overflow-hidden border border-pink-500/25 shadow-xl group"
                        >
                            <img
                                src="/images/bahvitrine/image.png"
                                alt="Bah!Vitrine — detalhe"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </div>

            <SlideNumber current={num} total={total} />
        </SlideLayout>
    );
};

export default SlideBahVitrine;
