import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { Target, Zap, Users, Award, Brain, Sparkles } from "lucide-react";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const tips = [
  { icon: Target, label: "Portfólio com IA", desc: "Projetos reais que mostram impacto — não tutoriais do YouTube" },
  { icon: Zap, label: "Velocidade", desc: "O mercado paga quem entrega rápido sem sacrificar qualidade" },
  { icon: Users, label: "Network", desc: "Comunidade e conexões reais valem mais que qualquer currículo" },
  { icon: Award, label: "Diferencial", desc: "Resolver problemas de negócio, não só saber codar" },
  { icon: Brain, label: "Pensamento Sistêmico", desc: "Enxergar o produto como um todo, não só a sua task" },
  { icon: Sparkles, label: "Marca Pessoal", desc: "LinkedIn, GitHub ativo, artigos — mostre que você existe" },
];

const SlideDesafioEterno = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(15, "title", "O Desafio Eterno");

  return (
    <SlideLayout>
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 02</div>
          <h2 className="font-display text-[72px] font-bold leading-[1.1] text-foreground mb-4">{title}</h2>
          <p className="text-[22px] text-slide-gray-light mb-14">Como se destacar num mercado cada vez mais competitivo</p>
        </motion.div>
        <div className="grid grid-cols-3 gap-5">
          {tips.map((tip, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-start gap-5 bg-slide-surface border border-border rounded-2xl p-7">
              <div className="w-12 h-12 rounded-2xl bg-slide-accent/15 flex items-center justify-center shrink-0">
                <tip.icon className="w-6 h-6 text-slide-accent" />
              </div>
              <div>
                <div className="text-[22px] font-semibold text-foreground mb-1">{tip.label}</div>
                <div className="text-[16px] text-slide-gray-light leading-relaxed">{tip.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideDesafioEterno;
