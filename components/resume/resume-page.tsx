import { MainMenu } from "../main-menu";
import { ResumeEditor } from "./resume-editor";

export const ResumePage = () => {
  return (
    <div className="dot-pattern-bg overflow-auto">
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="z-10 overflow-hidden my-10">
          <div className="rounded-[14px] shadow-elevation-01 overflow-hidden">
            <ResumeEditor />
          </div>
        </div>
      </div>
      <MainMenu />
    </div>
  );
};
