import { Logo } from "../common";

export const Navbar = () => {
  return (
    <header className="fixed min-w-[90vh] max-w-[400px] top-5 left-[50%] transform -translate-x-[50%] rounded-2xl z-50 bg-black/25 backdrop-blur-sm border border-white/5">
      <div className="px-4 py-3 flex items-center justify-between gap-10">
        <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center">
          <Logo />
        </div>

        <button className="flex items-center gap-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium tracking-wide transition-colors">
          Login
        </button>
      </div>
    </header>
  );
};
