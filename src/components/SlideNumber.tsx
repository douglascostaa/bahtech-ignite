import { useSlidePosition } from "@/contexts/SlidePositionContext";

const SlideNumber = ({ current, total }: { current: number; total: number }) => {
  const ctx = useSlidePosition();
  const displayCurrent = ctx?.position ?? current;
  const displayTotal = ctx?.total ?? total;

  return (
    <div className="absolute bottom-10 right-16 text-slide-gray text-[18px] font-light tracking-wider">
      {String(displayCurrent).padStart(2, '0')} / {String(displayTotal).padStart(2, '0')}
    </div>
  );
};

export default SlideNumber;
