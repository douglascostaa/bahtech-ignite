import { createContext, useContext } from "react";

interface SlidePositionContextType {
    position: number;
    total: number;
}

const SlidePositionContext = createContext<SlidePositionContextType | null>(null);

export const SlidePositionProvider = SlidePositionContext.Provider;

export function useSlidePosition(): SlidePositionContextType | null {
    return useContext(SlidePositionContext);
}

export default SlidePositionContext;
