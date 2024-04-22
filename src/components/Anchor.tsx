export function Anchor({
  direction = '',
  name
}: {
  direction: string;
  name: string;
}) {
  return (
    <a
      className=" cursor-pointer rounded-lg text-center bg-cinder-50 w-full hover:bg-[#d9d5ff] hover:text-cinder-800 mt-0  max-w-full m-0 py-2  text-cinder-750 box-border "
      href={direction}
    >
      {name}
    </a>
  );
}
