import { ResumeEditor } from "./resume-editor";

export const ResumePage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#f7f7f7]">
      <div className="z-10 p-2.5 bg-linear-to-b from-[#eae5e9] overflow-hidden to-[#eae9e3] rounded-3xl outline outline-black my-8">
        <div className="rounded-2xl overflow-hidden shadow-[0_0_10px_1px_#cdcace]">
          <ResumeEditor />
        </div>
      </div>
    </div>
  );
};
