export const metadata = {
  title: "Resume Builder",
  description: "Craft and download beautiful resumes in minutes.",
};

export default function ResumeLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 md:px-8">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
            Resume Studio
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Build a polished resume with live previews and custom themes.
          </h1>
          <p className="text-base text-slate-600">
            Start with our default document, tweak copy inside the editor, then
            export JSON or print-ready PDF when you are done.
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}
