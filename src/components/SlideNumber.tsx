const SlideNumber = ({ current, total }: { current: number; total: number }) => (
  <div className="absolute bottom-10 right-16 text-slide-gray text-[18px] font-light tracking-wider">
    {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
  </div>
);

export default SlideNumber;
