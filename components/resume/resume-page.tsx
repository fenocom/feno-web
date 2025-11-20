import { ResumeEditor } from "./resume-editor";

export const ResumePage = () => {
  return (
    <div className="dot-pattern-bg overflow-auto">
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="z-10 p-1 rounded-[16px] outline outline-[#eda1f0] my-8">
          <div className="rounded-[14px] overflow-hidden shadow-elevation-01">
            <ResumeEditor />
          </div>
        </div>
      </div>
    </div>
  );
};
