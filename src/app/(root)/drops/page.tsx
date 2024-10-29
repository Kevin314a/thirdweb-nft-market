'use server'

import Link from "next/link";
import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@/components/base";
import { DropUpcoming, DropProgressing } from "@/components/Drop";
import { IoAddCircleOutline } from "react-icons/io5";

export default async function DropsPage() {
  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] lg:px-[42px] px-5 mx-auto z-10 relative flex justify-between items-center">
        <h4 className="lg:text-[36px] lg:leading-[75px] text-2xl text-white font-bold">
          <span className="bg-heading-bg  bg-clip-text text-transparent">
            Drops
          </span>
        </h4>
        <Link href="/create/drop">
          <Button><IoAddCircleOutline color="white" size={24} />Create</Button>
        </Link>
      </div>
      <div className="max-w-[1920px] lg:px-[42px] px-5 mx-auto z-10 relative">
        <DropUpcoming />
      </div>
      <div className="max-w-[1920px] lg:px-[42px] px-5 pt-8 mx-auto z-10 relative">
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
              <DropProgressing />
            </TabPanel>
            <TabPanel>
              <DropProgressing />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <div className="h-[900px] bg-[#1D0B07] blur-[200px] absolute w-1/4 -top-2/3 right-0 z-0"></div>
    </section>
  );
}