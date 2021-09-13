import { ActionsButtons } from './ActionsButtons';
import { AdjustmentButton } from './AdjustmentButton';
import { GenresOption } from './GenresOption';
import { useOptions } from './useOptions';
import { Modal, useModal } from './Modal';
import { ReleaseDatesOption } from './ReleaseDatesOption';
import { SortResultsByOption } from './SortResultsByOption';
import { UserScoreOption } from './UserScoreOption';
import { DateTitle, IsAdjustmentButtonDisabled, ModalTitle, SortByOptions } from './types';
import { Options, UserScoreRange } from '~/api/tmdb';

type Props = {
  sortByOptions: SortByOptions;
  userScoreRange: UserScoreRange;
  dateTitle: DateTitle;
  modalTitle: ModalTitle;
  onAccept(newOptions: Options): void;
  onSetDefault(): void;
  initialOptions: Options;
  defaultOptions: Options;
  isDisabled: IsAdjustmentButtonDisabled;
};

export const Adjustment = ({
  sortByOptions,
  userScoreRange,
  dateTitle,
  modalTitle,
  onAccept,
  onSetDefault,
  initialOptions,
  defaultOptions,
  isDisabled,
}: Props) => {
  const optionsConfig = useOptions(initialOptions, defaultOptions);
  const { isModalOpened, setIsModalOpened } = useModal(false);

  const openModalHandler = () => {
    setIsModalOpened(true);
  };

  const closeModalHandler = () => {
    optionsConfig.resetOptions();
    setIsModalOpened(false);
  };

  const setDefaultHandler = () => {
    optionsConfig.setDefaultOptions();
    onSetDefault();
    setIsModalOpened(false);
  };

  const acceptHandler = () => {
    onAccept(optionsConfig.options);
    optionsConfig.acceptOptions();
    setIsModalOpened(false);
  };

  return (
    <>
      <AdjustmentButton
        isDisabled={isDisabled}
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
              sortBy={optionsConfig.options.sortBy}
              sortByHandler={optionsConfig.sortByHandler}
            />

            <ReleaseDatesOption
              dateFrom={optionsConfig.options.dates.from}
              dateTo={optionsConfig.options.dates.to}
              setDateFromHandler={optionsConfig.setDateFromHandler}
              setDateToHandler={optionsConfig.setDateToHandler}
              dateTitle={dateTitle}
            />

            <GenresOption
              genres={optionsConfig.options.genres}
              toggleGenreHandler={optionsConfig.toggleGenreHandler}
            />

            <UserScoreOption
              userScoreRange={userScoreRange}
              changeUserScoreHandler={optionsConfig.changeUserScoreHandler}
              userScore={optionsConfig.options.userScore}
            />
          </>
        }
        actions={
          <ActionsButtons
            isReadyToAccept={optionsConfig.isReadyToAccept}
            setDefaultHandler={setDefaultHandler}
            cancelHandler={closeModalHandler}
            acceptHandler={acceptHandler}
          />
        }
      />
    </>
  );
};
