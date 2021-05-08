import { bool } from 'prop-types';

import { Button } from '@material-ui/core';

import types from '~common/types';

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
        color="default"
      >
        Apply
      </Button>
    </>
  );
};

ActionsButtons.propTypes = {
  cancelHandler: types.generic.handler.isRequired,
  acceptHandler: types.generic.handler.isRequired,
  isReadyToAccept: bool.isRequired,
};

export default ActionsButtons;
