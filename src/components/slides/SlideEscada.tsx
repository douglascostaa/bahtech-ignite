import { motion } from "framer-motion";
import SlideLayout from "../SlideLayout";
import SlideNumber from "../SlideNumber";
import { useSlideText } from "@/contexts/SlideOverridesContext";

const steps = [
  { year: "2021", role: "Bolsista", desc: "Programa de capacitação intensivo — base de dados, lógica, primeiros projetos reais" },
  { year: "2021", role: "Trainee", desc: "Primeiro contato corporativo na Compass.UOL — ritmo de empresa, sprints, code review" },
  { year: "2022", role: "Júnior", desc: "Entregando em produção com responsabilidade — debugging em ambiente real" },
  { year: "2023", role: "Pleno", desc: "Liderando features complexas, mentorias internas e decisões de arquitetura" },
];

const SlideEscada = ({ num, total }: { num: number; total: number }) => {
  const title = useSlideText(3, "title", "A Escada do Dev");
  const desc = useSlideText(3, "desc", "Trajetória na Compass.UOL — cada degrau constrói o próximo");

  return (
    <SlideLayout>
      <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-slide-accent text-[18px] font-medium tracking-[0.25em] uppercase mb-6">Módulo 01</div>
          <h2 className="font-display text-[72px] font-bold leading-[1.1] text-foreground mb-4">{title}</h2>
          <p className="text-[22px] text-slide-gray-light mb-14">{desc}</p>
        </motion.div>
        <div className="flex items-end gap-6 h-[400px]">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.5 }} style={{ originY: 1, height: `${40 + i * 20}%` }}
              className="flex-1 bg-gradient-to-t from-slide-accent/30 to-slide-accent/5 border border-slide-accent/20 rounded-3xl p-8 flex flex-col justify-end">
              <div className="text-[16px] text-slide-accent font-medium mb-2">{step.year}</div>
              <div className="text-[26px] font-bold text-foreground mb-2">{step.role}</div>
              <div className="text-[16px] text-slide-gray-light leading-relaxed">{step.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideNumber current={num} total={total} />
    </SlideLayout>
  );
};

export default SlideEscada;
