import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { useSlideText } from "@/contexts/SlideOverridesContext";
import { Linkedin, Instagram, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const contacts = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    sublabel: "Douglas Costa",
    qr: "/images/linkedin-douglas.png",
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    iconBg: "bg-blue-500/15",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    sublabel: "BahTech",
    qr: "/images/linkedin-bahtech.png",
    color: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    iconBg: "bg-sky-500/15",
  },
  {
    icon: Instagram,
    label: "Instagram",
    sublabel: "@bahtech",
    qr: "/images/instagram-bahtech.png",
    color: "text-pink-400",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    iconBg: "bg-pink-500/15",
  },
];

const SlideConclusao = ({ num, total }: { num: number; total: number }) => {
  const phrase = useSlideText(22, "phrase", "O futuro é de quem constrói");

  return (
    <SlideLayout>
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-t from-slide-bg via-slide-bg/80 to-slide-bg/40" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-[120px] gap-10">

        {/* Main phrase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-[88px] font-bold leading-[1.05] text-foreground mb-4">
            {phrase}
          </h2>
          <p className="text-[22px] text-slide-gray-light">
            Obrigado pela presença! Vamos nos conectar 👇
          </p>
        </motion.div>

        {/* QR Codes row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-stretch gap-6"
        >
          {contacts.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
              className={`flex flex-col items-center gap-4 ${c.bg} border ${c.border} rounded-3xl p-6`}
            >
              {/* QR code image */}
              <div className="w-[160px] h-[160px] bg-white rounded-2xl p-2 shadow-lg">
                <img
                  src={c.qr}
                  alt={`QR Code ${c.label} ${c.sublabel}`}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Label */}
              <div className="flex flex-col items-center gap-1">
                <div className={`flex items-center gap-2 ${c.iconBg} rounded-full px-3 py-1`}>
                  <c.icon className={`w-4 h-4 ${c.color}`} />
                  <span className={`text-[13px] font-semibold ${c.color} uppercase tracking-wide`}>{c.label}</span>
                </div>
                <span className="text-foreground text-[16px] font-medium">{c.sublabel}</span>
              </div>
            </motion.div>
          ))}

          {/* Email card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.86, duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 bg-slide-accent/10 border border-slide-accent/30 rounded-3xl p-6 min-w-[200px]"
          >
            <div className="bg-slide-accent/15 p-5 rounded-2xl">
              <Mail className="w-10 h-10 text-slide-accent" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-[13px] font-semibold text-slide-accent uppercase tracking-wide">E-mail</span>
              <span className="text-foreground text-[15px] font-medium">contato@bahtech.com.br</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom site */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-[18px] text-slide-gray-light"
        >
          bahtech.com.br
        </motion.p>
      </div>

      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideConclusao;
