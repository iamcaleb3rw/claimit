"use client";
import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Map pathname to tab value
  const tabMap: Record<string, string> = {
    "/account": "tab-1",
    "/account/lost": "tab-2",
    "/account/found": "tab-3",
    "/account/find": "tab-4",
    "/account/matches": "tab-5",
  };

  const currentTab = tabMap[pathname] || "tab-1";

  return (
    <main>
      <div className="py-1 bg-linear-to-b from-white from-80% to-transparent  sticky z-30 top-0">
        <Tabs value={currentTab}>
          <ScrollArea>
            <TabsList className="relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border">
              <TabsTrigger
                asChild
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                value="tab-1"
              >
                <Link href="/account">
                  <HouseIcon
                    aria-hidden="true"
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                  Overview
                </Link>
              </TabsTrigger>

              <TabsTrigger
                asChild
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                value="tab-2"
              >
                <Link href="/account/lost">
                  <PanelsTopLeftIcon
                    aria-hidden="true"
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                  Report a Lost Item
                </Link>
              </TabsTrigger>

              <TabsTrigger
                asChild
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                value="tab-3"
              >
                <Link href="/account/found">
                  <BoxIcon
                    aria-hidden="true"
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                  Report a Found Item
                </Link>
              </TabsTrigger>

              <TabsTrigger
                asChild
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                value="tab-4"
              >
                <Link href="/account/find">
                  <BoxIcon
                    aria-hidden="true"
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                  Track / Search for Lost Items
                </Link>
              </TabsTrigger>

              <TabsTrigger
                asChild
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                value="tab-5"
              >
                <Link href="/account/matches">
                  <BoxIcon
                    aria-hidden="true"
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                  Matches
                </Link>
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>
      </div>
      <div className="max-w-3xl mx-auto">{children}</div>
    </main>
  );
}
