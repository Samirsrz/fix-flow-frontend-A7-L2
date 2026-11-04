import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "./home-content";
import { Reveal } from "./reveal";

export function FaqSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="text-sm font-semibold text-primary">FAQ</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Quick answers
          </h2>
          <p className="mt-4 max-w-sm leading-7 text-muted-foreground">
            A few details to help you understand how FixFlow fits into daily
            community life.
          </p>
          <Link
            href="/faq"
            className={buttonVariants({ variant: "outline", className: "mt-6" })}
          >
            See all questions
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion className="w-full">
            {faqs.map(([question, answer], index) => (
              <AccordionItem value={`item-${index}`} key={question}>
                <AccordionTrigger className="text-left">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="leading-7 text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}