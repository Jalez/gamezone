/** @format */

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';

interface PopUpProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const PopUp: React.FC<PopUpProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleConfirm = () => {
    if (dontShowAgain) {
      // Save the user's preference to not show the pop-up again
      // e.g. by using localStorage or a state management library
    }

    onConfirm();
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <FormControlLabel
          control={
            <Checkbox
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
          }
          label="Don't show this again"
        />
        <Button onClick={onCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color='primary'>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
