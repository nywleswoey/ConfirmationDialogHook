import React, { ReactElement, createContext, useContext, useRef, useState } from 'react';
import { ConfirmationDialog, ConfirmationDialogOption } from './ConfirmationDialog';

interface ProviderProps {
  children: ReactElement<any> | null;
}

type ContextType = (options: ConfirmationDialogOption, dialogContent: ReactElement) => Promise<void>;

const ConfirmationServiceContext = createContext<ContextType>(Promise.reject);

export const useConfirmation = () => useContext(ConfirmationServiceContext);

export const ConfirmationServiceProvider = ({ children }: ProviderProps) => {
  const [
    confirmationState,
    setConfirmationState
  ] = useState<ConfirmationDialogOption | null>(null);

  const [dialogContent, setDialogContent] = useState<ReactElement | null>(null);

  const awaitingPromiseRef = useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const openConfirmation = (options: ConfirmationDialogOption, dialogChildren?: ReactElement) => {
    setConfirmationState(options);
    dialogChildren ? setDialogContent(dialogChildren) : setDialogContent(null);

    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }

    setConfirmationState(null);
  };

  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }

    setConfirmationState(null);
  };

  return (
    <>
      <ConfirmationServiceContext.Provider
        value={openConfirmation}
        children={children}
      />

      <ConfirmationDialog
        open={Boolean(confirmationState)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...confirmationState}
      >
        {dialogContent}
      </ConfirmationDialog>
    </>
  );
};
