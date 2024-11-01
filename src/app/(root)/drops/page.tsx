'use server'

import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/components/base";
import { DropUpcoming, DropProgressing } from "@/components/Drop";
import { activeDrops, pastDrops, upcomingDrops } from "@/server-actions/drop";
import { IoAddCircleOutline } from "react-icons/io5";
import Link from "next/link";

export default async function DropsPage() {
  const upcomings = await upcomingDrops();

  console.log('-------------------------upcomingsupcomings-------------------------',upcomings);
  const progressings = await activeDrops();
  console.log('-------------------------progressings-------------------------', progressings);
  const pasts = await pastDrops();
  console.log('-------------------------pastspasts-------------------------', pasts);

  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] px-2 lg:px-6 mx-auto z-10 relative flex justify-between items-center">
        <h4 className="py-2 text-2xl text-white font-bold">
          <span className="bg-heading-bg  bg-clip-text text-transparent">
            Drops
          </span>
        </h4>
        <Link href="/create/drop">
          <Button><IoAddCircleOutline color="white" size={24} />Create</Button>
        </Link>
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