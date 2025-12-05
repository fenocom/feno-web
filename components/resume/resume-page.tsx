"use client";
import { usePrintResume } from "./hooks/use-print-resume";
import Toolbar from "./menus/toolbar";
import { ResumeEditor } from "./resume-editor";

export const ResumePage = () => {
  const { printResume } = usePrintResume();

  const switchTemplate = () => { };

  const createPortfolio = () => { };

  return (
    <div className="w-full h-full flex items-center justify-center px-10 py-20">
      <div className="rounded-lg overflow-hidden">
        <ResumeEditor />
      </div>
      <Toolbar />
    </div>
  );
};
