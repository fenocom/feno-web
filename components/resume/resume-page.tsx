"use client";
import { usePrintResume } from "./hooks/use-print-resume";
import Toolbar from "./menus/toolbar";
import { ResumeEditor } from "./resume-editor";

export const ResumePage = () => {
  const { printResume } = usePrintResume();

  const switchTemplate = () => { };

  const createPortfolio = () => { };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Toolbar />
      <ResumeEditor />
    </div>
  );
};
