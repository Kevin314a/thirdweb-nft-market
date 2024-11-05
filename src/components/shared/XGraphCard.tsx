import { ReactNode } from 'react';
import { LineChart } from "../Chart/LineChart";
import { XCard } from ".";

export const XGraphCard = ({ className, title, data }: {
  className: string,
  title: string,
  data: ReactNode,
}) => {
  return (
    <XCard
      className={className}
      border={true}
      header={title}
    >
      <div>
        <span> </span>
        <span> </span>
        <span> </span>
        <span> </span>
        <span> </span>
      </div>
      {/* <LineChart
        data={data}
      /> */}
    </XCard>
  );
};
