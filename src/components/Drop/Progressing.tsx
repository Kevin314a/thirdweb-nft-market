import { DropProgressingItem } from ".";

export const DropProgressing = ({
}: {
  }) => {

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 lg:gap-4 sm:max-w-full max-w-[300px] mx-auto">
      {[1, 2, 3, 4, 5].map((i) => (
        <DropProgressingItem key={i} />
      ))}
    </div>
  )
};
