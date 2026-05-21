import { ArrowRight, Construction } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[color:var(--background)] px-4 py-10">
      <Card className="w-full max-w-xl">
        <CardContent className="grid gap-6 px-6 pb-6 pt-8 text-center">
          <div className="mx-auto">
            <Logo />
          </div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue-deep)]">
            <Construction className="h-7 w-7" />
          </div>
          <div className="grid gap-3">
            <p className="text-sm font-bold uppercase text-[color:var(--blue)]">Feature coming soon</p>
            <h1 className="text-3xl font-extrabold text-[color:var(--navy)]">This page is not ready yet.</h1>
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              We are still building this part of GetBadged. Use the available dashboard and public pages for now.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/" iconRight={<ArrowRight size={18} />}>
              Go to home
            </Button>
            <Button href="/candidate" variant="secondary">
              Candidate dashboard
            </Button>
            <Button href="/department" variant="secondary">
              Department dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
