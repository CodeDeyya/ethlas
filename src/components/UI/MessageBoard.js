import React from 'react';
import {
  ButtonWrapper,
  Container,
  Title,
  TitleBox,
} from '../Styled/messageBoard.styled';
import { AiFillCloseSquare } from 'react-icons/ai';
import { Button } from '@mui/material';

export default function MessageBoard({ display, setOpenMessage }) {
  return (
    <Container display={display}>
      <TitleBox>
        <Title>Welcome Adventurer To Ethlas</Title>
        <AiFillCloseSquare
          size={30}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setOpenMessage(false);
          }}
        />
      </TitleBox>
      <ButtonWrapper>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpenMessage(false);
          }}
        >
          Log In
        </Button>
      </ButtonWrapper>
    </Container>
  );
}
