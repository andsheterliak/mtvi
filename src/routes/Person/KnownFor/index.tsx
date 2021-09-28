import { useParams } from 'react-router-dom';
import { Person, useGetPersonQuery } from '~/api/tmdb';
import { IdParam } from '~/routes/types';
import { CardsGridRow, NoContent, Section, SectionTitle, Slider } from '~/shared/components';
import { TOP_ITEM_AMOUNT } from '~/shared/constants';
import { getTopItems } from '~/shared/utils';
import { MixedCards } from './MixedCards';
import { JoinedCredits } from '../types';

const sortByVoteDescending = (data: JoinedCredits) => {
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

const removeDuplicates = (data: JoinedCredits) => {
  const set = new Set();

  const filteredArr = data.filter((item) => {
    const isDuplicated = set.has(item.id);

    set.add(item.id);

    return !isDuplicated;
  });

  return filteredArr;
};

const joinData = (
  movieCredits: Person['movie_credits'] | undefined,
  tvCredits: Person['tv_credits'] | undefined
) => {
  const joinedData = [];

  if (movieCredits?.cast) joinedData.push(...movieCredits.cast);
  if (movieCredits?.crew) joinedData.push(...movieCredits.crew);
  if (tvCredits?.cast) joinedData.push(...tvCredits.cast);
  if (tvCredits?.crew) joinedData.push(...tvCredits.crew);

  return joinedData;
};

const getKnownForData = (
  movieCredits: Person['movie_credits'] | undefined,
  tvCredits: Person['tv_credits'] | undefined
) => {
  if (!movieCredits && !tvCredits) return null;

  const joinedData = joinData(movieCredits, tvCredits);

  if (joinedData.length === 0) return null;

  const sortedData = sortByVoteDescending(joinedData);
  const cleanedData = removeDuplicates(sortedData);
  const newData = getTopItems(cleanedData, TOP_ITEM_AMOUNT);

  return newData;
};

export const KnownFor = () => {
  const { id } = useParams<IdParam>();
  const personQuery = useGetPersonQuery(id);

  const knownForData = getKnownForData(
    personQuery.data?.movie_credits,
    personQuery.data?.tv_credits
  );

  const ariaLabelledby = 'knownFor';

  const content =
    !personQuery.isLoading && !knownForData ? (
      <NoContent message="We don't have added any data for this section." />
    ) : (
      <Slider ariaLabelledby={ariaLabelledby}>
        <CardsGridRow>
          <MixedCards isLoading={personQuery.isLoading} cardsData={knownForData} />
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
