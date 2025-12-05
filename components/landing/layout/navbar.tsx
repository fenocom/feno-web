import { Button, Link } from "@heroui/react";

import { Logo } from "../../common";
import { ProductsMenu } from "../ui/products-menu";

const triggerClassname =
    "font-host text-base cursor-pointer flex justify-center items-center";

export const Navbar = () => {
    return (
        <>
            <header className="fixed max-w-[80vw] min-w-[700px] top-5 left-[50%] isolate transform -translate-x-[50%] rounded-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between gap-10 z-80 backdrop-blur-lg">
                    <div className="h-6 px-3 bg-white rounded-full gap-2 text-black flex items-center justify-center">
                        <Logo />{" "}
                        <span className="font-bold font-host">FENO</span>
                    </div>
                    <nav className="flex items-center justify-center gap-8 min-h-8">
                        <ProductsMenu triggerClassname={triggerClassname} />
                        <div className={triggerClassname}>
                            <Link
                                href="/showcase"
                                className="text-base font-normal"
                            >
                                Showcase <Link.Icon />
                            </Link>
                        </div>
                        <div className={triggerClassname}>
                            <Link
                                href="/pricing"
                                className="text-base font-normal"
                            >
                                Pricing <Link.Icon />
                            </Link>
                        </div>
                    </nav>
                    <Button size="sm" className="bg-[#1148b8]! max-h-7! px-5!">
                        Login
                    </Button>
                </div>
                <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[70px]" />
                <div className="bg-black/15 top-0 left-0 absolute pointer-events-none z-50 w-full h-full" />
            </header>
        </>
    );
};
