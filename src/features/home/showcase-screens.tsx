import { Check, ImageIcon, MapPin, Star, Wrench } from "lucide-react";
import type { HeroStep } from "./hero-steps";

const STAR_IDS = ["s1", "s2", "s3", "s4", "s5"];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-medium text-muted-foreground">{label}</p>
      <p className="rounded-lg border bg-background px-2.5 py-2 text-[10px] font-medium text-card-foreground">
        {value}
      </p>
    </div>
  );
}

function PhotoTile({ tint = false }: { tint?: boolean }) {
  return (
    <div
      className={`flex h-14 flex-1 items-center justify-center rounded-lg border border-dashed ${tint ? "bg-primary/10" : "bg-muted/50"}`}
    >
      <ImageIcon
        className={`size-4 ${tint ? "text-primary" : "text-muted-foreground"}`}
      />
    </div>
  );
}

function ReportScreen() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] text-muted-foreground">New request</p>
          <h3 className="text-sm font-semibold">Report an issue</h3>
        </div>
        <span className="rounded-full bg-accent px-2 py-1 text-[9px] font-semibold text-accent-foreground">
          Plumbing
        </span>
      </div>
      <Field label="TITLE" value="Kitchen sink is leaking" />
      <Field label="LOCATION" value="Unit 4B, Block C" />
      <div className="flex gap-2">
        <PhotoTile />
        <PhotoTile />
      </div>
      <div className="w-full rounded-lg bg-primary py-2.5 text-center text-[10px] font-semibold text-primary-foreground">
        Submit report
      </div>
    </div>
  );
}

function AssignScreen() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] text-muted-foreground">Issue #1048</p>
          <h3 className="text-sm font-semibold">Kitchen sink is leaking</h3>
        </div>
        <span className="rounded-full bg-destructive/10 px-2 py-1 text-[9px] font-semibold text-destructive">
          High priority
        </span>
      </div>
      <div className="rounded-xl border bg-muted/40 p-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-semibold">Assigned</span>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary">
            Now
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
            AH
          </div>
          <div>
            <p className="text-[10px] font-semibold">Anwar Hossain</p>
            <p className="text-[9px] text-muted-foreground">
              Plumbing specialist
            </p>
          </div>
          <Wrench className="ml-auto size-3.5 text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
        <MapPin className="size-3" />
        Green Valley Residency
      </div>
    </div>
  );
}

function FixScreen() {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[9px] text-muted-foreground">
          Work log · Today, 11:42 AM
        </p>
        <h3 className="text-sm font-semibold">Repair in progress</h3>
      </div>
      <div className="space-y-2 border-l border-primary/30 pl-3 text-[9px]">
        <div>
          <p className="font-semibold text-card-foreground">Assigned</p>
          <p className="text-muted-foreground">Anwar accepted the request</p>
        </div>
        <div>
          <p className="font-semibold text-primary">In progress</p>
          <p className="text-muted-foreground">Repair started on site</p>
        </div>
      </div>
      <div className="rounded-xl border bg-muted/40 p-3">
        <p className="text-[10px] font-medium">
          Replaced the damaged joint and sealed the pipe
        </p>
        <p className="mt-1 text-[9px] text-muted-foreground">
          Materials: PVC joint, sealant
        </p>
        <div className="mt-3 flex gap-2">
          <div className="flex h-12 flex-1 items-center justify-center rounded-lg bg-background">
            <ImageIcon className="size-4 text-muted-foreground" />
          </div>
          <div className="flex h-12 flex-1 items-center justify-center rounded-lg bg-primary/10">
            <ImageIcon className="size-4 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmScreen() {
  return (
    <div className="flex min-h-[270px] flex-col items-center justify-center text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
        <Check className="size-7" />
      </div>
      <p className="text-[9px] text-muted-foreground">Issue resolved</p>
      <h3 className="mt-1 text-lg font-semibold">Kitchen sink is fixed</h3>
      <div className="my-4 flex gap-1" role="img" aria-label="5 out of 5 stars">
        {STAR_IDS.map((id) => (
          <Star key={id} className="size-4 fill-primary text-primary" />
        ))}
      </div>
      <div className="w-full rounded-lg bg-primary py-2.5 text-center text-[10px] font-semibold text-primary-foreground">
        Confirm fix
      </div>
    </div>
  );
}

export function ShowcaseScreen({ step }: { step: HeroStep }) {
  switch (step.id) {
    case "report":
      return <ReportScreen />;
    case "assign":
      return <AssignScreen />;
    case "fix":
      return <FixScreen />;
    case "confirm":
      return <ConfirmScreen />;
  }
}

const CARD_TEXT: Record<
  HeroStep["id"],
  Record<"primary" | "secondary", [string, string]>
> = {
  report: {
    primary: ["Reported", "Your request is in"],
    secondary: ["Photos attached", "2 photos added"],
  },
  assign: {
    primary: ["Assigned", "Manager assigned a worker"],
    secondary: ["High priority", "Urgent response"],
  },
  fix: {
    primary: ["In progress", "Repair is underway"],
    secondary: ["Proof uploaded", "Before and after photos"],
  },
  confirm: {
    primary: ["Closed", "Issue resolved"],
    secondary: ["Feedback 5/5", "Thanks for confirming"],
  },
};

export function FloatingCard({
  step,
  variant,
}: {
  step: HeroStep;
  variant: "primary" | "secondary";
}) {
  const [title, subtitle] = CARD_TEXT[step.id][variant];

  return (
    <div className="rounded-xl border bg-card/95 px-3 py-2.5 shadow-xl backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-3.5" />
        </span>
        <div>
          <p className="text-[10px] font-semibold text-card-foreground">
            {title}
          </p>
          <p className="text-[9px] text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}