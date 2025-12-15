import Navbar from "@/components/navbar";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="py-14 space-y-4 flex text-center flex-col items-center">
        <TextAnimate
          as="h1"
          className="text-7xl font-perfectly-nineties max-w-4xl"
        >
          Lost your belongings on a bus? we'll get it back to you
        </TextAnimate>
        <TextAnimate
          delay={0.2}
          animation="blurIn"
          className="font-medium text-black/90 max-w-2xl"
        >
          Post lost items, report what you find, and let our AI match them
          instantly. Confirmed finds unlock rewards and boost your reputation;
          because every lost item deserves a happy ending.
        </TextAnimate>
        <div className="space-x-2">
          <Button asChild className="rounded-full">
            <Link href={"/account/found"}>Report a found item</Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-muted-foreground/10"
            variant={"secondary"}
          >
            <Link href={"/account/find"}>Search for a lost item</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
