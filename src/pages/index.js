import * as React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Game = dynamic(() => import('@/components/Game/Game.jsx'), {
  ssr: true,
});

export default function Home() {
  const [score, setScore] = React.useState(0);

  return (
    <div>
      <Head>
        <title>Phaser Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Score is {score}</h1>
      <Game setScore={setScore} />
    </div>
  );
}
