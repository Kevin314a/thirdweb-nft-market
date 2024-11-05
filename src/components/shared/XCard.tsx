import classNames from "classnames";
import { ReactNode } from 'react';

export function XCard({ className, children, border, header, footer }: {
  className?: string,
  children: ReactNode,
  border?: boolean,
  header: ReactNode,
  footer?: ReactNode,
}) {

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
