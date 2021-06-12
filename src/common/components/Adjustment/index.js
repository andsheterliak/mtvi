import Modal, { useModal } from './Modal';
import AdjustmentButton from './AdjustmentButton';
import ActionsButtons from './ActionsButtons';
import SortResultsByOption from './SortResultsByOption';
import ReleaseDatesOption from './ReleaseDatesOption';
import GenresOption from './GenresOption';
import UserScoreOption from './UserScoreOption';

import useOptions from './hooks/useOptions';

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
  const { isModalOpened, setIsModalOpened } = useModal(false);

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

export default Adjustment;
