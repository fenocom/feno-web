"use client";

import * as Slider from "@radix-ui/react-slider";
import styles from "./styles.module.css";

export function FontSlider({ value, onChange, min = 8, max = 64 }) {
    return (
        <Slider.Root
            className={styles.sliderRoot}
            min={min}
            max={max}
            value={[value]}
            onValueChange={(v) => onChange(v[0])}
        >
            <Slider.Track className={styles.sliderTrack}>
                <Slider.Range className={styles.sliderRange} />
            </Slider.Track>

            <Slider.Thumb className={styles.sliderThumb} />
        </Slider.Root>
    );
}
