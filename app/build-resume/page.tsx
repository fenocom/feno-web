import { ResumePage } from "@/libs/components/resume/resume-page";
import { ResumeProvider } from "@/libs/components/resume/context/ResumeContext";
import { ThemeProvider } from "@/libs/components/resume/context/ThemeContext.jsx";

export default function BuildResumePage() {
  return (
    <ResumeProvider>
      <ThemeProvider>
        <ResumePage />
      </ThemeProvider>
    </ResumeProvider>
  );
}
