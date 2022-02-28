import { Button } from '@mui/material';
import {
  Card,
  CurrentScore,
  HighScore,
} from 'components/Styled/scoreCard.styled.js';
import React from 'react';

export default function ScoreCard({ score, highScore, startPlay, start }) {
  return (
    <Card>
      <CurrentScore>Current Score {score} </CurrentScore>
      <HighScore>High Score {highScore}</HighScore>
      {!start && (
        <Button onClick={startPlay} variant="contained">
          Start Playing
        </Button>
      )}
    </Card>
  );
}
