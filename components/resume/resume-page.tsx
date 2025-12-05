"use client";

import { useCallback, useState } from "react";
import { FileDown, Shuffle, Globe } from "lucide-react";
import Toolbar from "./menus/toolbar";
import { ResumeEditor } from "./resume-editor";
import { downloadPDF } from "./utils";
import { usePrintResume } from "./hooks/use-print-resume";



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
