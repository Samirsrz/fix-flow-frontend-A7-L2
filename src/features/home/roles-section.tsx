"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ImageIcon, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { roles } from "./home-content";
import { Reveal } from "./reveal";

function MockPanel({ role }: { role: string }) {
  if (role === "residents") {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">My reported issues</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {(
            [
              ["Leaking tap in kitchen", "Reported", "secondary"],
              ["Lift light needs replacing", "In progress", "outline"],
              ["Gate lock repaired", "Closed", "default"],
            ] as const
          ).map(([title, status, variant]) => (
            <div
              key={title}
              className="flex items-center justify-between gap-3 rounded-xl border p-3"
            >
              <span className="text-sm font-medium">{title}</span>
              <Badge variant={variant}>{status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (role === "managers") {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Issue queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Water pressure complaint</span>
              <Badge variant="destructive">High</Badge>
            </div>
            <div className="mt-5 flex items-center gap-3 border-t pt-4">
              <Avatar className="size-9">
                <AvatarFallback>RA</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Rafiq Ahmed</p>
                <p className="text-xs text-muted-foreground">Assign worker</p>
              </div>
              <UserRound className="ml-auto size-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Job #1048</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Replace the damaged corridor switch and check nearby fittings.
        </p>
        <div className="rounded-xl border border-dashed bg-muted/40 p-4 text-sm text-muted-foreground">
          Add a completion note…
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed bg-muted/40">
            <ImageIcon className="text-muted-foreground" />
          </div>
          <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed bg-muted/40">
            <ImageIcon className="text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RolesSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm font-semibold text-primary">Built for everyone</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            One platform, three experiences
          </h2>
        </Reveal>

        <Tabs defaultValue="residents" className="mt-10">
          <TabsList className="grid h-auto w-full max-w-lg grid-cols-3">
            <TabsTrigger value="residents">Residents</TabsTrigger>
            <TabsTrigger value="managers">Managers</TabsTrigger>
            <TabsTrigger value="workers">Workers</TabsTrigger>
          </TabsList>

          {roles.map((role) => (
            <TabsContent value={role.id} key={role.id}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid items-center gap-10 pt-8 lg:grid-cols-2 lg:gap-16"
                >
                  <div>
                    <h3 className="font-heading text-2xl font-semibold">
                      {role.heading}
                    </h3>
                    <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                      {role.description}
                    </p>
                    <ul className="mt-6 grid gap-3">
                      {role.checklist.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm">
                          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="size-3.5" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <MockPanel role={role.id} />
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}