import { Footer } from "@/libs/components/common/footer";
import { Navigation } from "@/libs/components/common/nav";
import { Button } from "@/libs/ui/button";
import Link from "next/link";

export default async function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Your Story,
                        <br />
                        Beautifully Told
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                        Transform your resume into a stunning digital portfolio
                        in minutes. Share your professional journey with style
                        and impact.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Button asChild size="lg" className="text-lg px-8">
                            <Link href="/onx">Get Started</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="text-lg px-8"
                        >
                            <Link href="/build-resume">Build Resume</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="text-lg px-8"
                        >
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
