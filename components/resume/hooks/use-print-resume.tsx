"use client";

export function usePrintResume() {
    const printResume = () => {
        const original = document.querySelector("#resume-container");
        if (!original) return;

        const clone = original.cloneNode(true);

        const wrapper = document.createElement("div");
        wrapper.id = "resume-print-root";

        wrapper.appendChild(clone);

        const printRoot = document.getElementById("print-root");
        if (!printRoot) return;

        printRoot.innerHTML = "";
        printRoot.appendChild(wrapper);

        requestAnimationFrame(() => {
            window.print();

            // cleanup
            setTimeout(() => {
                printRoot.innerHTML = "";
            }, 50);
        });
    };

    return { printResume };
}
