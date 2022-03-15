import * as React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import MessageBoard from 'components/UI/MessageBoard.js';

const Game = dynamic(() => import('@/components/Scene_1/index.js'), {
  ssr: true,
});

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [fade, setFade] = React.useState(false);

  const handleClick = () => {
    setFade(true);
    console.log('Clicked');
  };

  return (
    <>
      <Head>
        <title>Ethlas Lore</title>
        <link rel="icon" href="/assets/ethlas.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div>
        <Game
          setOpen={setOpen}
          start={start}
          setStart={setStart}
          setOpenMessage={setOpenMessage}
          fade={fade}
          setFade={setFade}
        >
          <MessageBoard
            display={openMessage}
            setOpenMessage={setOpenMessage}
            handleClick={handleClick}
          />
        </Game>
      </div>
    </>
  );
}
