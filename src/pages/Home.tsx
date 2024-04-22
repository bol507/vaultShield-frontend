import CardInfo from 'components/Menu/CardsInfo';
import { PadlockIcon, SecurityIcon } from 'components/svg/IconsCardsInfo';

export function Home() {
  return (
    <div className="flex flex-col sm:m-4  justify-center items-center w-full p-0 m-0">
      <main className="h-auto flex flex-col justify-center p-0 m-0 ">
        <section className="flex flex-col gap-4 ">
          <h1 className="text-cinder-100 text-7xl ">VaultShield</h1>
          <p className="text-cinder-700 text-2xl ">Password manager</p>
        </section>
      </main>
      <section className="flex justify-center items-center py-10 h-32 px-1 ">
        <CardInfo title="Store your passwords">
          <PadlockIcon />
        </CardInfo>
        <CardInfo title="Export your passwords">
          <SecurityIcon />
        </CardInfo>
      </section>
    </div>
  );
}

export default Home;
