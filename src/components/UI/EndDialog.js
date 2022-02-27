import React from 'react';
import { Button, Dialog } from '@mui/material';
import { DialogWrapper } from 'components/Styled/endDialog.styled.js';
import Image from 'next/image';
export default function EndDialog({ open, handleClose, score }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Image
        src="/assets/ethlas.png"
        alt="Picture of the author"
        width={300}
        height={300}
      />
      <DialogWrapper>Congralutions your score is {score}</DialogWrapper>
      <Button onClick={handleClose} variant="contained">
        Play Again
      </Button>
    </Dialog>
  );
}
