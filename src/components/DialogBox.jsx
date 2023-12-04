import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function DialogBox({ open, handleClose, title, description, type }) {
  const handleNo = () => {
    handleClose(false); // pass false to the handleClose function
  };

  const handleYes = () => {
    handleClose(true); // pass true to the handleClose function
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {type === 'confirmation' && (
          <Button onClick={handleNo} color="primary">
            NO
          </Button>
        )}
        <Button onClick={handleYes} color="primary" autoFocus>
          {type === 'informative' ? 'OK' : 'YES'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}