import Cards from '../../common/components/Cards/Cards';
import SectionTitle from '../../common/components/SectionTitle';
import Slider from '../../common/components/Slider/Slider';

const sortByVoteCountDescending = (data) => {
  const newData = [...data];

  newData.sort((a, b) => {
    const voteCountA = a.vote_count;
    const voteCountB = b.vote_count;

    if (voteCountA !== 0 && !voteCountA) return 1;
    if (voteCountB !== 0 && !voteCountB) return -1;

    return voteCountB - voteCountA;
  });

  return newData;
};

const removeDuplicatesById = (data) => {
  const set = new Set();

  const filteredArr = data.filter((item) => {
    const isDuplicated = set.has(item.id);

    set.add(item.id);

    return !isDuplicated;
  });

  return filteredArr;
};

const getFirstMostVoted = (data) => {
  data = data.slice(0, 9);

  return data.filter((item) => item.vote_count);
};

const KnownFor = ({ data }) => {
  let newData = [];

  const movieCast = data.movieCredits?.cast;
  const movieCrew = data.movieCredits?.crew;

  const tvCast = data.tvCredits?.cast;
  const tvCrew = data.tvCredits?.crew;

  if (movieCast) newData.push(...movieCast);
  if (movieCrew) newData.push(...movieCrew);
  if (tvCast) newData.push(...tvCast);
  if (tvCrew) newData.push(...tvCrew);

  let items;

  if (newData.length !== 0) {
    newData = sortByVoteCountDescending(newData);
    newData = removeDuplicatesById(newData);
    newData = getFirstMostVoted(newData);

    items = newData.length === 0 ? null : <Cards cardsData={newData} />;
  }

  return (
    <>
      {items && (
        <section>
          <SectionTitle title="Known For" />

          <Slider isLinks>{items}</Slider>
        </section>
      )}
    </>
  );
};

export default KnownFor;
