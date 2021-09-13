import { Button } from '@material-ui/core';

type Props = {
  cancelHandler(): void;
  setDefaultHandler(): void;
  acceptHandler(): void;
  isReadyToAccept: boolean;
};

export const ActionsButtons = ({
  cancelHandler,
  setDefaultHandler,
  acceptHandler,
  isReadyToAccept,
}: Props) => {
  return (
    <>
      <Button onClick={setDefaultHandler} size="large" color="default">
        Default
      </Button>

      <Button onClick={cancelHandler} size="large" color="default">
        Cancel
      </Button>

      <Button onClick={acceptHandler} disabled={!isReadyToAccept} size="large" color="primary">
        Apply
      </Button>
    </>
  );
};
