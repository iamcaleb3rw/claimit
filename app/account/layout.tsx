import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="py-1">
        <Tabs defaultValue="tab-1 my-1">
          <ScrollArea>
            <TabsList className="relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border">
              <Link href={"/account"}>
                <TabsTrigger
                  className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                  value="tab-1"
                >
                  <HouseIcon
                    aria-hidden="true"
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                  Overview
                </TabsTrigger>
              </Link>
              <Link href={"/account/lost"}>
                <TabsTrigger
                  className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                  value="tab-2"
                >
                  <PanelsTopLeftIcon
                    aria-hidden="true"
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                  Report a Lost Item
                </TabsTrigger>
              </Link>
              <Link href={"/account/found"}>
                <TabsTrigger
                  className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                  value="tab-3"
                >
                  <BoxIcon
                    aria-hidden="true"
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                  Report a found item
                </TabsTrigger>
              </Link>
              <TabsTrigger
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                value="tab-4"
              >
                <BoxIcon
                  aria-hidden="true"
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                />
                Track / Search for lost items
              </TabsTrigger>
              <TabsTrigger
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                value="tab-5"
              >
                <BoxIcon
                  aria-hidden="true"
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                />
                Matches
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>
      </div>
      <div className="max-w-4xl border mx-auto">{children}</div>
    </main>
  );
}
