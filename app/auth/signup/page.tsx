"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, dataConnectClient } from "@/lib/firebase";
import { useCreateUser } from "@/src/dataconnect-generated/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one numerical digit"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: createUserRecord } = useCreateUser(dataConnectClient);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", phoneNumber: "", password: "" },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setError(null);
    setLoading(true);
    try {
      // 1. Create Firebase Auth user
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      // 2. Write details to PostgreSQL using Data Connect mutation (which infers ID on server side)
      await createUserRecord({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
      });

      router.push("/");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email address is already in use.");
      } else {
        setError(err.message || "An unexpected error occurred during signup.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-zinc-950">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl font-semibold text-zinc-100">Create Account</h2>
          <p className="text-zinc-400 text-sm mt-2">Join Bengaluru's premium property network</p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5" htmlFor="fullName">
              Full Name
            </label>
            <Input
              id="fullName"
              disabled={loading}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
              placeholder="Arjun Mehta"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5" htmlFor="email">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              disabled={loading}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5" htmlFor="phoneNumber">
              Phone Number
            </label>
            <Input
              id="phoneNumber"
              type="tel"
              disabled={loading}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
              placeholder="9876543210"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              disabled={loading}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-zinc-100 font-semibold py-2.5 px-4 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-zinc-400 text-sm mt-5">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-emerald-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
