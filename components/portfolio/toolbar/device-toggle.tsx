"use client";

import { Button, Tooltip } from "@heroui/react";
import {
    IconDeviceDesktop,
    IconDeviceMobile,
    IconDeviceTablet,
} from "@tabler/icons-react";
import clsx from "clsx";
import type { DeviceType } from "../portfolio-page";

interface DeviceToggleProps {
    device: DeviceType;
    onChange: (device: DeviceType) => void;
    isDisabled?: boolean;
}

const devices: {
    type: DeviceType;
    icon: typeof IconDeviceDesktop;
    label: string;
}[] = [
    { type: "desktop", icon: IconDeviceDesktop, label: "Desktop" },
    { type: "tablet", icon: IconDeviceTablet, label: "Tablet" },
    { type: "mobile", icon: IconDeviceMobile, label: "Mobile" },
];

export function DeviceToggle({
    device,
    onChange,
    isDisabled,
}: DeviceToggleProps) {
    return (
        <div className="flex gap-0.5 bg-black/5 rounded-lg p-0.5">
            {devices.map(({ type, icon: Icon, label }) => (
                <Tooltip key={type} delay={0}>
                    <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        onPress={() => onChange(type)}
                        isDisabled={isDisabled}
                        className={clsx(
                            "p-1 min-w-7 h-7 rounded-md text-black transition-colors",
                            device === type
                                ? "bg-white shadow-sm"
                                : "bg-transparent hover:bg-white/50",
                        )}
                    >
                        <Icon size={16} />
                    </Button>
                    <Tooltip.Content>
                        <p>{label}</p>
                    </Tooltip.Content>
                </Tooltip>
            ))}
        </div>
    );
}
