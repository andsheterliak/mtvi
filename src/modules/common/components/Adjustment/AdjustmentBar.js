import SortResultsByOption from './SortResultsByOption';
import ReleaseDatesOption from './ReleaseDatesOption';
import GenresOption from './GenresOption';
import UserScore from './UserScore';

const AdjustmentBar = ({
  defaultOptions,
  sortByOptions,
  genres,
  toggleGenreHandler,
  changeUserScoreRangeHandler,
  dateTitle,
}) => {
  return (
    <>
      <SortResultsByOption
        sortByOptions={sortByOptions}
        defaultOptions={defaultOptions}
      />

      <ReleaseDatesOption dateTitle={dateTitle} />

      <GenresOption genres={genres} toggleGenreHandler={toggleGenreHandler} />

      <UserScore
        defaultOptions={defaultOptions}
        changeUserScoreRangeHandler={changeUserScoreRangeHandler}
      />
    </>
  );
};

export default AdjustmentBar;
