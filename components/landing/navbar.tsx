import { Logo } from "../common";
import { Button } from "@radix-ui/themes";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../common/navigation-menu";

export const Navbar = () => {
  return (
    <header className="fixed min-w-[90vh] max-w-[400px] top-5 left-[50%] isolate transform bg-black/5 -translate-x-[50%] rounded-2xl z-50 backdrop-blur-sm">
      <div className="px-4 py-3 flex items-center justify-between gap-10 z-10">
        <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[100px]" />
        <div className="h-6 px-3 bg-white rounded-full gap-2 text-black flex items-center justify-center">
          <Logo /> <span className="font-bold">FENO</span>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>Showcase</NavigationMenuItem>
            <NavigationMenuItem>Pricing</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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
