import { Button } from '@material-ui/core';

const ActionsButtons = ({ cancelHandler, acceptHandler, isReadyToAccept }) => {
  return (
    <>
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
