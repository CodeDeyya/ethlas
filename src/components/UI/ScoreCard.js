import {
  Card,
  CurrentScore,
  HighScore,
} from 'components/Styled/scoreCard.styled';
import React from 'react';

export default function ScoreCard({ score, highScore }) {
  return (
    <Card>
      <CurrentScore>Current Score {score} </CurrentScore>
      <HighScore>High Score {highScore}</HighScore>
    </Card>
  );
}
