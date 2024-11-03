'use server'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/components/base";
import { DropUpcoming, DropProgressing } from "@/components/Drop";
import { activeDrops, pastDrops, upcomingDrops } from "@/server-actions/drop";
import { cookies } from "next/headers";

export default async function DropsPage() {
  const cookieStore = cookies();
  const accountAddr = cookieStore.get('userAddr')?.value;

  const upcomings = !accountAddr ? [] : await upcomingDrops(accountAddr);
  const progressings = !accountAddr ? [] : await activeDrops(accountAddr);
  const pasts = !accountAddr ? [] : await pastDrops(accountAddr);

  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] px-2 lg:px-6 mx-auto z-10 relative">
        <h4 className="py-2 text-2xl text-white font-bold">
          <span className="bg-heading-bg  bg-clip-text text-transparent">
            Drops
          </span>
        </h4>
      </div>
      {!!upcomings.length && (
        <div className="max-w-[1920px] px-2 lg:px-6 mx-auto z-10 relative">
          <DropUpcoming items={upcomings} />
        </div>
      )}
      <div className="max-w-[1920px] px-2 lg:px-6 pt-8 mx-auto z-10 relative">
        <TabGroup className="w-full">
          <TabList className="mb-2 lg:mb-4">
            <Tab className="" variant="outline">
              Active & upcoming
            </Tab>
            <Tab className="" variant="outline">
              Past
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DropProgressing cardType="ACTIVE" items={progressings} />
            </TabPanel>
            <TabPanel>
              <DropProgressing cardType="PAST" items={pasts} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <div className="h-[900px] bg-[#1D0B07] blur-[200px] absolute w-1/4 -top-2/3 right-0 z-0"></div>
    </section>
  );
}