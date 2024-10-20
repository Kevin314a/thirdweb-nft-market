import { XCard } from "./"

const XTableCard = ({ title, data }) => {
  return (
    <XCard
      border={true}
      header={title}
    >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-golden-1000 font-inter leading-5 font-normal">
          <tr>
            {data?.header?.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="px-4 py-3 text-center"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.body?.map((b, k) => (
            <tr key={k} className="text-white/[70%] text-base leading-6">
              {b.map((r, j) => (
                <td key={j} className="lg:px-4 lg:py-4 p-2 text-sm lg:text-base text-center">
                  {r}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </XCard>
  );
};

export default XTableCard;