import React, { useState } from 'react';
import { Button, Grid } from "@material-ui/core";
import { useConfirmation } from "./ConfirmationService";

export const SampleComponent: React.FC = () => {
  const confirm = useConfirmation();
  const [counter, setCounter] = useState(0);
  const onOKBtnClick = () => setCounter(counter + 1);
  const onCancelBtnClick = () => { };

  const dialogContent = <p>Are you sure you want to increment the counter?</p>;

  const onClick = () => {
    confirm(
      {
        id: "confirmation-dialog",
        title: "Increment counter?",
        okBtnText: "Yes",
        cancelBtnText: "No",
      },
      dialogContent
    )
      .then(onOKBtnClick)
      .catch(onCancelBtnClick);
  };

  return (
    <Grid container alignItems="center" direction="column">
      <span>Counter Value: {counter}</span>
      <Button onClick={onClick}> Increment Counter </Button>
    </Grid>
  );
};
