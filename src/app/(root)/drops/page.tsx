'use server'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/components/base";
import { DropUpcoming, DropProgressing } from "@/components/Drop";
import { activeDrops, pastDrops, upcomingDrops } from "@/server-actions/drop";
import { cookies } from "next/headers";

export default async function DropsPage() {
  const cookieStore = cookies();
  const accountAddr = cookieStore.get('userAddr')?.value;

  const upcomings = await upcomingDrops(accountAddr);
  const progressings = await activeDrops(accountAddr);
  const pasts = await pastDrops(accountAddr);

  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] px-6 lg:px-10 mx-auto z-10 relative">
        <h4 className="py-2 text-2xl text-golden-1000 font-bold">
          Drops
        </h4>
      </div>
      {!!upcomings.length && (
        <div className="max-w-[1920px] px-6 lg:px-10 w-full mx-auto z-10 relative">
          <DropUpcoming items={upcomings} />
        </div>
      )}
      <div className="max-w-[1920px] px-6 lg:px-10 pt-8 mx-auto z-10 relative">
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