import { useState } from 'react';
import { exact, shape } from 'prop-types';

import Modal from './components/Modal';
import AdjustmentButton from './components/AdjustmentButton';
import ActionsButtons from './components/ActionsButtons';
import SortResultsByOption from './components/SortResultsByOption';
import ReleaseDatesOption from './components/ReleaseDatesOption';
import GenresOption from './components/GenresOption';
import UserScoreOption from './components/UserScoreOption';

import useOptions from './hooks/useOptions';
import adjustmentTypes from './adjustmentTypes';
import types from '~common/types';

const Adjustment = ({
  sortByOptions,
  userScoreRange,
  dateTitle,
  modalTitle,
  onAcceptCallback,
  initialOptions,
}) => {
  const {
    options,
    isReadyToAccept,
    resetOptions,
    setDateFromHandler,
    setDateToHandler,
    sortByHandler,
    toggleGenreHandler,
    changeUserScoreHandler,
    acceptOptions,
  } = useOptions(initialOptions);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModalHandler = () => {
    setIsModalOpened(true);
  };

  const closeModalHandler = () => {
    resetOptions();
    setIsModalOpened(false);
  };

  const acceptHandler = () => {
    onAcceptCallback(options);
    acceptOptions();
    setIsModalOpened(false);
  };

  return (
    <>
      <AdjustmentButton
        ariaLabel={modalTitle.toLowerCase()}
        openModalHandler={openModalHandler}
      />

      <Modal
        isOpened={isModalOpened}
        closeModalHandler={closeModalHandler}
        title={modalTitle}
        content={
          <>
            <SortResultsByOption
              sortByOptions={sortByOptions}
              sortBy={options.sortBy}
              sortByHandler={sortByHandler}
            />

            <ReleaseDatesOption
              dateFrom={options.dates.from}
              dateTo={options.dates.to}
              setDateFromHandler={setDateFromHandler}
              setDateToHandler={setDateToHandler}
              dateTitle={dateTitle}
            />

            <GenresOption
              genres={options.genres}
              toggleGenreHandler={toggleGenreHandler}
            />

            <UserScoreOption
              userScoreRange={userScoreRange}
              changeUserScoreHandler={changeUserScoreHandler}
              userScore={options.userScore}
            />
          </>
        }
        actions={
          <ActionsButtons
            isReadyToAccept={isReadyToAccept}
            cancelHandler={closeModalHandler}
            acceptHandler={acceptHandler}
          />
        }
      />
    </>
  );
};

Adjustment.propTypes = {
  sortByOptions: adjustmentTypes.sortByOptions,
  userScoreRange: adjustmentTypes.userScoreRange,
  dateTitle: adjustmentTypes.dateTitle,
  modalTitle: adjustmentTypes.modalTitle,
  onAcceptCallback: types.generic.handler.isRequired,

  initialOptions: shape({
    sortBy: adjustmentTypes.sortBy,
    userScore: adjustmentTypes.userScore,
    genres: adjustmentTypes.genres,

    dates: exact({
      from: adjustmentTypes.dates.from,
      to: adjustmentTypes.dates.to,
    }).isRequired,
  }).isRequired,
};

export default Adjustment;