import * as React from 'react';
import dynamic from 'next/dynamic';
import MessageBoard from 'components/UI/MessageBoard.js';
const Game = dynamic(() => import('@/components/Scene_1/index.js'), {
  ssr: true,
});

export default function Map() {
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
