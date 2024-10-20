import classNames from "classnames"

const XCard = ({ className, children, border, header, footer }) => {

  return (
    <div className={classNames("bg-golden-1000/[50%] flex flex-col rounded-lg", className)}>
      {!!header && (
        <div className={classNames("text-white text-lg", !!border && "border-b-2 border-golden-1000")}>
          {header}
        </div>
      )}
      {children}
    </div>
  );
};

export default XCard;