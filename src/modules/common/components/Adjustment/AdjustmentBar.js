import SortResultsByOption from './SortResultsByOption';
import RealiseDatesOption from './RealiseDatesOption';
import GenresOption from './GenresOption';
import UserScore from './UserScore';

const AdjustmentBar = ({
  defaultOptions,
  sortByOptions,
  genres,
  toggleGenreHandler,
  changeUserScoreRangeHandler,
}) => {
  return (
    <>
      <SortResultsByOption
        sortByOptions={sortByOptions}
        defaultOptions={defaultOptions}
      />

      <RealiseDatesOption />

      <GenresOption genres={genres} toggleGenreHandler={toggleGenreHandler} />

      <UserScore
        defaultOptions={defaultOptions}
        changeUserScoreRangeHandler={changeUserScoreRangeHandler}
      />
    </>
  );
};

export default AdjustmentBar;
