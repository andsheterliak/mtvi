import { Button } from '@material-ui/core';

const ActionsButtons = ({
  cancelHandler,
  setDefaultHandler,
  acceptHandler,
  isReadyToAccept,
}) => {
  return (
    <>
      <Button onClick={setDefaultHandler} size="large" color="default">
        Default
      </Button>

      <Button onClick={cancelHandler} size="large" color="default">
        Cancel
      </Button>

      <Button
        onClick={acceptHandler}
        disabled={!isReadyToAccept}
        size="large"
        color="primary"
      >
        Apply
      </Button>
    </>
  );
};

export default ActionsButtons;
