import { XCard } from ".";
import { LineChart } from "../Chart/LineChart";

const XGraphCard = ({ className, title, data }) => {
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

export default XGraphCard;