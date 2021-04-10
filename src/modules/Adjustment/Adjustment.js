import AdjustmentButton from './components/AdjustmentButton';
import ActionsButtons from './components/ActionsButtons';
import useOptions from './hooks/useOptions';
import Modal from '../common/components/Modal';
import SortResultsByOption from './components/SortResultsByOption';
import ReleaseDatesOption from './components/ReleaseDates/ReleaseDatesOption';
import GenresOption from './components/GenresOption';
import UserScoreOption from './components/UserScoreOption';

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
        ariaLAbel={modalTitle.toLowerCase()}
        openModalHandler={openModalHandler}
      />

      <Modal
        isOpened={isModalOpened}
        closeModalHandler={closeModalHandler}
        title={modalTitle}
        content={
          <>
            <SortResultsByOption
              {...{
                sortByOptions,
                sortBy: options.sortBy,
                sortByHandler,
              }}
            />

            <ReleaseDatesOption
              {...{
                dateFrom: options.dates.from,
                dateTo: options.dates.to,
                dateFromHandler,
                dateToHandler,
                dateTitle,
              }}
            />

            <GenresOption
              {...{
                genres: options.genres,
                toggleGenreHandler,
              }}
            />

            <UserScoreOption
              {...{
                userScoreRange,
                changeUserScoreHandler,
                userScore: options.userScore,
              }}
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

export default Adjustment;
