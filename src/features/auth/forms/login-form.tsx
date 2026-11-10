"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  MessageCircle,
  CreditCard,
  ListChecks,
  ShieldCheck,
  Users,
  Wrench,
  Home,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginValues = z.infer<typeof schema>;

type Props = {
  onSubmit: (values: LoginValues) => Promise<void>;
  onGoogleLogin: () => void;
  isLoading: boolean;
  isGoogleLoading: boolean;
  googleButton?: React.ReactNode;
}

const DEMO_ROLES = [
  {
    label: "Admin",
    icon: ShieldCheck,
    email: "admin@gmail.com",
    password: "123456",
    color: "text-destructive",
    bg: "hover:bg-destructive/10 hover:border-destructive/40",
  },
  {
    label: "Manager",
    icon: Users,
    email: "manager@fixflow.com",
    password: "123456",
    color: "text-primary",
    bg: "hover:bg-primary/10 hover:border-primary/40",
  },
  {
    label: "Worker",
    icon: Wrench,
    email: "worker1@fixflow.com",
    password: "worker123",
    color: "text-orange-500",
    bg: "hover:bg-orange-500/10 hover:border-orange-500/40",
  },
  {
    label: "Resident",
    icon: Home,
    email: "shahiluddinahamed@gmail.com",
    password: "newpass123",
    color: "text-green-600",
    bg: "hover:bg-green-600/10 hover:border-green-600/40",
  },
] as const;

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.49 4.49 0 0 1-1.95 2.95v2.45h3.16c1.85-1.7 2.9-4.2 2.9-7.23Z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.65 0 4.87-.88 6.49-2.39l-3.16-2.45c-.88.59-2 .94-3.33.94-2.56 0-4.73-1.73-5.51-4.06H3.22v2.53A9.8 9.8 0 0 0 12 21.75Z"
      />
      <path
        fill="#FBBC05"
        d="M6.49 13.79A5.9 5.9 0 0 1 6.18 12c0-.62.11-1.22.31-1.79V7.68H3.22A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05.97 4.32l3.27-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.15c1.44 0 2.73.5 3.75 1.49l2.81-2.81C16.86 3.13 14.65 2.25 12 2.25a9.8 9.8 0 0 0-8.78 5.43l3.27 2.53C7.27 7.88 9.44 6.15 12 6.15Z"
      />
    </svg>
  );
}

export default function LoginForm({
  onSubmit,
  onGoogleLogin,
  isLoading,
  isGoogleLoading,
  googleButton,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const fillDemo = (email: string, password: string, label: string) => {
    form.setValue("email", email, { shouldValidate: true });
    form.setValue("password", password, { shouldValidate: true });
    setActiveDemo(label);
  };

  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      {/* Left panel */}
      <aside className="relative hidden overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-20 top-16 size-72 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 size-80 rounded-full bg-primary-foreground/10 blur-3xl" />
        <Link href="/" className="relative font-heading text-2xl font-bold">
          FixFlow
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-md"
        >
          <p className="mb-3 text-sm font-medium text-primary-foreground/70">
            Welcome back
          </p>
          <h1 className="font-heading text-4xl font-bold tracking-tight">
            Keep your community moving forward.
          </h1>
          <ul className="mt-10 flex flex-col gap-5 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-3">
              <ListChecks className="size-5" />
              Track your reported issues
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="size-5" />
              Chat with your assigned worker
            </li>
            <li className="flex items-center gap-3">
              <CreditCard className="size-5" />
              Pay maintenance fees online
            </li>
          </ul>
        </motion.div>
        <p className="relative text-xs text-primary-foreground/50">
          The simple way to care for where you live.
        </p>
      </aside>

      {/* Right panel */}
      <section className="flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 lg:hidden">
            <Link href="/" className="font-heading text-2xl font-bold">
              FixFlow
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Log in to FixFlow
            </h2>
            <p className="mt-2 text-muted-foreground">
              Welcome back. Let&apos;s get things moving.
            </p>
          </div>

          {/* Demo role buttons */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Demo — click a role to fill credentials
            </p>
            <div className="grid grid-cols-4 gap-2">
              {DEMO_ROLES.map(({ label, icon: Icon, email, password, color, bg }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => fillDemo(email, password, label)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all duration-200",
                    bg,
                    activeDemo === label
                      ? "border-current bg-current/10 ring-1 ring-current/30"
                      : "border-border bg-card",
                    color,
                  )}
                >
                  <Icon className="size-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && (
                  <Loader2
                    data-icon="inline-start"
                    className="animate-spin"
                  />
                )}
                {isLoading ? "Logging in…" : "Log in"}
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            or
            <div className="h-px flex-1 bg-border" />
          </div>

         {googleButton ? (
  googleButton
) : (
  <Button
    type="button"
    variant="outline"
    onClick={onGoogleLogin}
    disabled={isGoogleLoading}
    className="w-full"
  >
    {isGoogleLoading ? (
      <Loader2 data-icon="inline-start" className="animate-spin" />
    ) : (
      <GoogleIcon />
    )}
    {isGoogleLoading ? "Connecting…" : "Continue with Google"}
  </Button>
)}
        </motion.div>
      </section>
    </main>
  );
}