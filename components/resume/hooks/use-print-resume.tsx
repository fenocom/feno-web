"use client";

export function usePrintResume() {
  const printResume = () => {
    const original = document.querySelector("#resume-container");
    if (!original) return;

    const clone = original.cloneNode(true) as HTMLElement;
    clone.id = "resume-print";

    const printRoot = document.getElementById("print-root");
    if (!printRoot) return;

    // CLEAR & INSERT CLONE
    printRoot.innerHTML = "";
    printRoot.appendChild(clone);

    // Wait for browser paint
    setTimeout(() => {
      window.print();

      // After closing print dialog, clean DOM
      setTimeout(() => {
        printRoot.innerHTML = "";
      }, 50);
    }, 50);
  };

  return { printResume };
}