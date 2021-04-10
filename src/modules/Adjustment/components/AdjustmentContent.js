import SortResultsByOption from './SortResultsByOption';
import ReleaseDatesOption from './ReleaseDates/ReleaseDatesOption';
import GenresOption from './GenresOption';
import UserScoreOption from './UserScoreOption';

const AdjustmentContent = ({ sortBy, genres, userScore, dates }) => {
  return (
    <>
      <SortResultsByOption {...sortBy} />

      <ReleaseDatesOption {...dates} />

      <GenresOption {...genres} />

      <UserScoreOption {...userScore} />
    </>
  );
};

export default AdjustmentContent;
