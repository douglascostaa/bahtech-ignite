import { ReactNode } from "react";

interface SlideLayoutProps {
  children: ReactNode;
  className?: string;
}

const SlideLayout = ({ children, className = "" }: SlideLayoutProps) => {
  return (
    <div className={`slide-content relative w-[1920px] h-[1080px] bg-slide-bg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default SlideLayout;
