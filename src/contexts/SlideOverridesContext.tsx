import { createContext, useContext } from "react";

type SlideTextOverrides = { [slideIndex: number]: { [field: string]: string } };

const SlideOverridesContext = createContext<SlideTextOverrides>({});

export const SlideOverridesProvider = SlideOverridesContext.Provider;

export function useSlideText(slideIndex: number, field: string, defaultValue: string): string {
  const overrides = useContext(SlideOverridesContext);
  return overrides[slideIndex]?.[field] ?? defaultValue;
}
