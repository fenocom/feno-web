"use client";

import { useAuth } from "@/lib/auth/context";
import { Button, InputGroup, Label, TextField } from "@heroui/react";
import {
    IconBrandGoogle,
    IconLock,
    IconMail,
    IconUser,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function LoginContent() {
    const {
        user,
        isLoading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
    } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (user && !isLoading) {
            router.push("/resume");
        }
    }, [user, isLoading, router]);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setSuccessMessage(null);
        setIsSubmitting(true);

        try {
            if (isSignUp) {
                const { error } = await signUpWithEmail(
                    email,
                    password,
                    fullName,
                );
                if (error) {
                    setFormError(error);
                } else {
                    setSuccessMessage(
                        "Check your email for a confirmation link!",
                    );
                }
            } else {
                const { error } = await signInWithEmail(email, password);
                if (error) {
                    setFormError(error);
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="animate-pulse text-neutral-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md p-8"
            >
                <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
                            {isSignUp ? "Create an account" : "Welcome to Feno"}
                        </h1>
                        <p className="text-neutral-500">
                            {isSignUp
                                ? "Sign up to start building your resume"
                                : "Sign in to access your resume builder"}
                        </p>
                    </div>

                    {(error || formError) && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {formError ||
                                "Authentication failed. Please try again."}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                            {successMessage}
                        </div>
                    )}

                    <form
                        onSubmit={handleEmailAuth}
                        className="flex flex-col gap-4 mb-6"
                    >
                        {isSignUp && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden p-0.5 -m-0.5"
                            >
                                <TextField
                                    name="fullName"
                                    value={fullName}
                                    onChange={setFullName}
                                    isRequired
                                >
                                    <Label>Full Name</Label>
                                    <InputGroup>
                                        <InputGroup.Prefix>
                                            <IconUser className="size-4 text-neutral-400" />
                                        </InputGroup.Prefix>
                                        <InputGroup.Input placeholder="John Doe" />
                                    </InputGroup>
                                </TextField>
                            </motion.div>
                        )}

                        <TextField
                            name="email"
                            type="email"
                            value={email}
                            onChange={setEmail}
                            isRequired
                        >
                            <Label>Email</Label>
                            <InputGroup>
                                <InputGroup.Prefix>
                                    <IconMail className="size-4 text-neutral-400" />
                                </InputGroup.Prefix>
                                <InputGroup.Input placeholder="you@example.com" />
                            </InputGroup>
                        </TextField>

                        <TextField
                            name="password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                            isRequired
                        >
                            <Label>Password</Label>
                            <InputGroup>
                                <InputGroup.Prefix>
                                    <IconLock className="size-4 text-neutral-400" />
                                </InputGroup.Prefix>
                                <InputGroup.Input placeholder="Enter your password" />
                            </InputGroup>
                        </TextField>

                        <Button
                            type="submit"
                            isDisabled={isSubmitting}
                            className="w-full bg-neutral-900 text-white hover:bg-neutral-800 h-12 rounded-xl font-medium flex items-center justify-center gap-2"
                        >
                            <IconMail size={20} />
                            {isSubmitting
                                ? "Please wait..."
                                : isSignUp
                                  ? "Sign up with Email"
                                  : "Sign in with Email"}
                        </Button>
                    </form>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-neutral-500">
                                or
                            </span>
                        </div>
                    </div>

                    <Button
                        onPress={signInWithGoogle}
                        className="w-full bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 h-12 rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                        <IconBrandGoogle size={20} />
                        Continue with Google
                    </Button>

                    <p className="mt-6 text-center text-sm text-neutral-600">
                        {isSignUp
                            ? "Already have an account?"
                            : "Don't have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setFormError(null);
                                setSuccessMessage(null);
                            }}
                            className="text-neutral-900 font-medium hover:underline"
                        >
                            {isSignUp ? "Sign in" : "Sign up"}
                        </button>
                    </p>

                    <p className="mt-4 text-center text-xs text-neutral-400">
                        By signing in, you agree to our Terms of Service and
                        Privacy Policy
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                    <div className="animate-pulse text-neutral-500">
                        Loading...
                    </div>
                </div>
            }
        >
            <LoginContent />
        </Suspense>
    );
}
