import { exact, func, string } from 'prop-types';

import Modal from './components/Modal';
import AdjustmentButton from './components/AdjustmentButton';
import ActionsButtons from './components/ActionsButtons';
import SortResultsByOption from './components/SortResultsByOption';
import ReleaseDatesOption from './components/ReleaseDatesOption/ReleaseDatesOption';
import GenresOption from './components/GenresOption';
import UserScoreOption from './components/UserScoreOption';

import useOptions from './hooks/useOptions';
import adjustmentTypes from './adjustmentTypes';

const Adjustment = ({
  optionsLSName,
  sortByOptions,
  userScoreRange,
  dateTitle,
  modalTitle,
  fetchItems,
  initialOptions,
}) => {
  const {
    options,
    isModalOpened,
    isReadyToAccept,
    openModalHandler,
    closeModalHandler,
    dateFromHandler,
    dateToHandler,
    sortByHandler,
    toggleGenreHandler,
    changeUserScoreHandler,
    acceptHandler,
  } = useOptions(optionsLSName, fetchItems, initialOptions);

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
              dateFromHandler={dateFromHandler}
              dateToHandler={dateToHandler}
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
  optionsLSName: string.isRequired,
  sortByOptions: adjustmentTypes.sortByOptions,
  userScoreRange: adjustmentTypes.userScoreRange,
  dateTitle: adjustmentTypes.dateTitle,
  modalTitle: adjustmentTypes.modalTitle,
  fetchItems: func.isRequired,

  initialOptions: exact({
    sortBy: string.isRequired,
    userScore: adjustmentTypes.userScore,
    genres: adjustmentTypes.genres,

    dates: exact({
      from: adjustmentTypes.dates.from,
      to: adjustmentTypes.dates.to,
    }).isRequired,
  }).isRequired,
};

export default Adjustment;
