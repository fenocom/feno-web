import { Logo } from "../common";
import { Button } from "@radix-ui/themes";

const triggerClassname =
  "font-host hover:font-serif hover:italic hover:font-bold! hover:text-lg! text-base! cursor-pointer min-w-[100px] flex justify-center items-center";

export const Navbar = () => {
  return (
    <header className="fixed min-w-[90vh] max-w-[400px] top-5 left-[50%] isolate transform bg-black/15 -translate-x-[50%] rounded-2xl z-50 backdrop-blur-lg">
      <div className="px-4 py-3 flex items-center justify-between gap-10 z-10">
        <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[100px]" />
        <div className="h-6 px-3 bg-white rounded-full gap-2 text-black flex items-center justify-center">
          <Logo /> <span className="font-bold font-host">FENO</span>
        </div>
        <nav className="flex items-center justify-center min-h-8">
          <div className={triggerClassname}>Products</div>
          <div className={triggerClassname}>Showcase</div>
          <div className={triggerClassname}>Pricing</div>
        </nav>
        <Button
          className="rounded-full! px-5! text-white! bg-[#1148b8]!"
          variant="ghost"
        >
          Login
        </Button>
      </div>
    </header>
  );
};
