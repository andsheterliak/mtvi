import { useSelector } from 'react-redux';

import { checkIfIsData, getTopItems } from '~common/utils/getData';

import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import Cards from '~components/Cards';
import CardsGridRow from '~components/grids/CardsGridRow';
import NoContent from '~components/NoContent';
import Slider from '~components/Slider';

const sortByVoteDescending = (data) => {
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

const removeDuplicates = (data) => {
  const set = new Set();

  const filteredArr = data.filter((item) => {
    const isDuplicated = set.has(item.id);

    set.add(item.id);

    return !isDuplicated;
  });

  return filteredArr;
};

const joinData = (data) => {
  const newData = [];

  const movieCast = data.movieCredits?.cast;
  const movieCrew = data.movieCredits?.crew;

  const tvCast = data.tvCredits?.cast;
  const tvCrew = data.tvCredits?.crew;

  if (movieCast) newData.push(...movieCast);
  if (movieCrew) newData.push(...movieCrew);
  if (tvCast) newData.push(...tvCast);
  if (tvCrew) newData.push(...tvCrew);

  return newData;
};

const getKnownFor = (data) => {
  let newData;

  newData = sortByVoteDescending(data);
  newData = removeDuplicates(newData);
  newData = getTopItems(newData);

  return newData;
};

const KnownFor = () => {
  const data = useSelector((state) => state.person.data);

  const joinedData = joinData({
    movieCredits: null,
    tvCredits: data.tv_credits,
  });

  const content = checkIfIsData(joinedData) ? (
    <Slider>
      <CardsGridRow>
        <Cards cardsData={getKnownFor(joinedData)} />
      </CardsGridRow>
    </Slider>
  ) : (
    <NoContent message="We don't have added any data for this section." />
  );

  return (
    <Section>
      <SectionTitle title="Known For" />

      {content}
    </Section>
  );
};

export default KnownFor;
