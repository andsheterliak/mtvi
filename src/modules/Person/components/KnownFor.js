import Card from '../../common/components/Cards/Card';
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

    items = newData.map((item) => {
      const path = item.name ? `/tv/` : `/movies/`;

      return (
        <Card
          key={item.id}
          id={item.id}
          path={path}
          posterPath={item.poster_path}
          releaseDate={item.release_date || item.first_air_date}
          title={item.title || item.name}
          voteAverage={item.vote_average}
        />
      );
    });

    if (items.length === 0) items = null;
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
