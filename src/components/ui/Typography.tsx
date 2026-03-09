import type { ReactNode } from "react";

const TYPES = {
  h1: "h1",
  h2: "h2",
  h3: "h3"
} as const;

const TYPES_STYLES = {
    h1: "text-muted-foreground text-lg mb-1",
    h2: "text-sm text-muted-foreground font-medium",
    h3: "text-sm text-muted-foreground",
};

export const Typography = ({ children, type }: { children: ReactNode, type: keyof typeof TYPES }) => {
    const Component = TYPES[type];
    const style = TYPES_STYLES[type];

    return <Component className={style}> {children} </Component>;
};
