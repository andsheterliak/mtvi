import { createSelector } from '@reduxjs/toolkit';
import noImage from '~/assets/img/no-image.svg';
import {
  CardsGridRow,
  NoContent,
  Section,
  SectionTitle,
  Slider,
} from '~/components';
import { ROUTE_NAMES, TOP_ITEM_AMOUNT } from '~/constants';
import { IMG_BASE_URL, IMG_SIZES } from '~/tmdb-config';
import { getTopItems, ifIsData } from '~/utils';
import { MixedCards } from './components/MixedCards';
import { getMovieCredits, getTVCredits } from './personSelectors';

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

const getKnownForData = createSelector(
  [getMovieCredits, getTVCredits],
  (movieCredits, tvCredits) => {
    const joinedData = joinData({ movieCredits, tvCredits });

    if (!ifIsData(joinedData)) return null;

    let newData;

    newData = sortByVoteDescending(joinedData);
    newData = removeDuplicates(newData);
    newData = getTopItems(newData, TOP_ITEM_AMOUNT);

    return newData;
  }
);

export const KnownFor = ({ isLoading, data }) => {
  const knownForData = getKnownForData(data);

  const content =
    !isLoading && !knownForData ? (
      <NoContent message="We don't have added any data for this section." />
    ) : (
      <Slider>
        <CardsGridRow>
          <MixedCards
            isLoading={isLoading}
            cardsData={knownForData}
            routeNames={ROUTE_NAMES}
            topItemAmount={TOP_ITEM_AMOUNT}
            imgData={{
              basePath: IMG_BASE_URL,
              size: IMG_SIZES.poster.w342,
              fallback: noImage,
            }}
          />
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
