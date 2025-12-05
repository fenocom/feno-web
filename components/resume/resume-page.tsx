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
      <div className="p-1 border border-black/5 relative bg-black/5 rounded-xl" >
        <div className="overflow-hidden rounded-lg border border-black/5">
          <ResumeEditor />
        </div>
        <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px]" />
      </div>
      <Toolbar />
    </div>
  );
};
