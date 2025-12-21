"use client";

import { forwardRef } from "react";

export const VerticalList = forwardRef<HTMLDivElement, any>(
    ({ style, children, ...props }, ref) => (
        <div
            ref={ref}
            {...props}
            style={style}
            className="flex gap-3 p-3 justify-center"
        >
            {children}
        </div>
    )
);
VerticalList.displayName = "VerticalList";

export const HorizontalList = forwardRef<HTMLDivElement, any>(
    ({ style, children, ...props }, ref) => (
        <div ref={ref} {...props} style={style} className="flex flex-wrap">
            {children}
        </div>
    )
);
HorizontalList.displayName = "HorizontalList";

export const GridItem = ({ children, ...props }: any) => (
    <div {...props} className="shrink-0">
        {children}
    </div>
);
