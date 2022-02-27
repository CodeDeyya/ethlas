import * as React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import ScoreCard from '../components/UI/ScoreCard.js';
import { WrapperHome } from 'components/Styled/index.styled.js';
import EndDialog from '../components/UI/EndDialog.js';
const Game = dynamic(() => import('@/components/Game/Game.js'), {
  ssr: true,
});

export default function Home() {
  const [score, setScore] = React.useState(0);
  const [scoreArray, setScoreArray] = React.useState([0]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    let newScores = [score, ...scoreArray];
    setScoreArray(newScores);
    setScore(0);
    setOpen(false);
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
      </Head>
      <WrapperHome>
        <EndDialog open={open} handleClose={handleClose} score={score} />
        <ScoreCard score={score} highScore={Math.max(...scoreArray)} />
        <Game setScore={setScore} setOpen={setOpen} />
      </WrapperHome>
    </>
  );
}
