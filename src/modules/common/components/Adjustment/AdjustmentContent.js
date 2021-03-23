import SortResultsByOption from './SortResultsByOption';
import ReleaseDatesOption from './ReleaseDates/ReleaseDatesOption';
import GenresOption from './GenresOption';
import UserScore from './UserScore';

const AdjustmentContent = ({ sortBy, genres, userScore, dates }) => {
  return (
    <>
      <SortResultsByOption {...sortBy} />

      <ReleaseDatesOption {...dates} />

      <GenresOption {...genres} />

      <UserScore {...userScore} />
    </>
  );
};

export default AdjustmentContent;
