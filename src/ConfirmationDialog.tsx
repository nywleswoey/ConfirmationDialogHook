import React, { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';

export interface ConfirmationDialogOption extends Pick<DialogProps, "maxWidth"> {
  id?: string;
  title?: string;
  okBtnText?: string;
  cancelBtnText?: string;

}

export interface ConfirmationDialogProps extends ConfirmationDialogOption {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  id,
  open,
  maxWidth = 'xs',
  title,
  onSubmit,
  onClose,
  children,
  okBtnText = "Ok",
  cancelBtnText = "Cancel"
}) => {
  return (
    <Dialog
      id={id}
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth={maxWidth}
      aria-labelledby="confirmation-dialog-title"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onSubmit}
          color="primary"
          id="ok-btn"
        >
          {okBtnText}
        </Button>
        <Button
          onClick={onClose}
          color="primary"
          id="cancel-btn"
          autoFocus
        >
          {cancelBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
