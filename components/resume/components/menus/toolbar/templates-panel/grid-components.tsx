"use client";

import { type ComponentPropsWithoutRef, forwardRef } from "react";

export const VerticalList = forwardRef<
    HTMLDivElement,
    ComponentPropsWithoutRef<"div">
>(({ style, children, ...props }, ref) => (
    <div
        ref={ref}
        {...props}
        style={style}
        className="flex gap-3 p-3 justify-center"
    >
        {children}
    </div>
));
VerticalList.displayName = "VerticalList";

export const HorizontalList = forwardRef<
    HTMLDivElement,
    ComponentPropsWithoutRef<"div">
>(({ style, children, ...props }, ref) => (
    <div ref={ref} {...props} style={style} className="flex flex-wrap">
        {children}
    </div>
));
HorizontalList.displayName = "HorizontalList";

export const GridItem = ({
    children,
    ...props
}: ComponentPropsWithoutRef<"div">) => (
    <div {...props} className="shrink-0">
        {children}
    </div>
);
