const CardInfo = ({ title }: { title: string }) => {
  return (
    <div className="border-[1px] border-opacity-60 px-3 py-6 md:p-8 w-full h-full max-h-[500px] border-[#33419b] flex items-center gap-0 md:gap-3">
      <div>{title}</div>
    </div>
  );
};

export default CardInfo;
