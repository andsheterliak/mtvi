import { useParams } from 'react-router-dom';
import { useGetPersonQuery } from '~/api/tmdb';
import {
  CardsGridRow,
  NoContent,
  Section,
  SectionTitle,
  Slider,
} from '~/shared/components';
import { TOP_ITEM_AMOUNT } from '~/shared/constants';
import { getTopItems, ifIsData } from '~/shared/utils';
import { MixedCards } from './MixedCards';

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

const joinData = ({ movieCredits, tvCredits }) => {
  const newData = [];

  const movieCast = movieCredits?.cast;
  const movieCrew = movieCredits?.crew;

  const tvCast = tvCredits?.cast;
  const tvCrew = tvCredits?.crew;

  if (movieCast) newData.push(...movieCast);
  if (movieCrew) newData.push(...movieCrew);
  if (tvCast) newData.push(...tvCast);
  if (tvCrew) newData.push(...tvCrew);

  return newData;
};

const getKnownForData = (movieCredits, tvCredits) => {
  if (!movieCredits && !tvCredits) return null;

  const joinedData = joinData({ movieCredits, tvCredits });

  if (!ifIsData(joinedData)) return null;

  let newData;

  newData = sortByVoteDescending(joinedData);
  newData = removeDuplicates(newData);
  newData = getTopItems(newData, TOP_ITEM_AMOUNT);

  return newData;
};

export const KnownFor = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPersonQuery(id);
  const knownForData = getKnownForData(data?.movie_credits, data?.tv_credits);

  const content =
    !isLoading && !knownForData ? (
      <NoContent message="We don't have added any data for this section." />
    ) : (
      <Slider isLoading={isLoading}>
        <CardsGridRow>
          <MixedCards isLoading={isLoading} cardsData={knownForData} />
        </CardsGridRow>
      </Slider>
    );

  return (
    <Section>
      <SectionTitle title="Known For" />

      {content}
    </Section>
  );
};