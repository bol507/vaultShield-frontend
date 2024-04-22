import { ReactElement } from 'react';

export function CardInfo({
  children,
  title
}: {
  children: ReactElement;
  title: string;
}) {
  return (
    <div className=" border-[1px] border-opacity-60 px-3 py-6 md:p-8 w-full h-full max-h-[500px] border-[#33419b] flex items-center gap-0 md:gap-3 ">
      <div>{children}</div>
      <div> {title}</div>
    </div>
  );
}
