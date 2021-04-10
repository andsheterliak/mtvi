import AdjustmentContent from './components/AdjustmentContent';
import AdjustmentButton from './components/AdjustmentButton';
import ActionsButtons from './components/ActionsButtons';
import useOptions from './hooks/useOptions';
import Modal from '../common/components/Modal';

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
          <AdjustmentContent
            sortBy={{
              sortByOptions,
              sortBy: options.sortBy,
              sortByHandler,
            }}
            userScore={{
              userScoreRange,
              changeUserScoreHandler,
              userScore: options.userScore,
            }}
            genres={{
              genres: options.genres,
              toggleGenreHandler,
            }}
            dates={{
              dates: options.dates,
              dateFromHandler,
              dateToHandler,
              dateTitle,
            }}
          />
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
