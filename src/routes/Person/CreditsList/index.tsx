import { useParams } from 'react-router-dom';
import { Person, useGetPersonQuery } from '~/api/tmdb';
import { IdParam } from '~/routes/types';
import {
  Filter,
  FilterValue,
  NoContent,
  Section,
  SectionTitle,
  SelectorContainer,
  useFilter,
} from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { formatDateStr } from '~/shared/utils';
import { JoinedCredits } from '../types';
import { filterConfig } from './filterConfig';
import { ProjectsTimeline } from './ProjectsTimeline';
import { TimelineData, TimelineItems } from './types';

const getCreditsState = (
  movieCredits: Person['movie_credits'] | undefined,
  tvCredits: Person['tv_credits'] | undefined
) => {
  const isMovieCast = !!movieCredits?.cast.length;
  const isMovieCrew = !!movieCredits?.crew.length;

  const isTVCast = !!tvCredits?.cast.length;
  const isTVCrew = !!tvCredits?.crew.length;

  const isData = isMovieCast || isMovieCrew || isTVCast || isTVCrew;

  const isNeedInFiltering = (isMovieCast || isMovieCrew) && (isTVCast || isTVCrew);

  return { isData, isNeedInFiltering };
};

const filterData = ({
  movieCredits,
  tvCredits,
  filterBy,
}: {
  movieCredits: Person['movie_credits'] | undefined;
  tvCredits: Person['tv_credits'] | undefined;
  filterBy: FilterValue;
}) => {
  const filteredData: JoinedCredits = [];

  const movieCast = movieCredits?.cast;
  const movieCrew = movieCredits?.crew;

  const tvCast = tvCredits?.cast;
  const tvCrew = tvCredits?.crew;

  switch (filterBy) {
    case filterConfig.all.value:
      [movieCast, movieCrew, tvCast, tvCrew].forEach((item) => {
        if (item) filteredData.push(...item);
      });

      break;

    case filterConfig.movies.value:
      [movieCast, movieCrew].forEach((item) => {
        if (item) filteredData.push(...item);
      });

      break;

    case filterConfig.tvShows.value:
      [tvCast, tvCrew].forEach((item) => {
        if (item) filteredData.push(...item);
      });

      break;

    default:
      break;
  }

  return filteredData;
};

const sortByDateDescending = (data: TimelineItems) => {
  const newData = [...data];

  // Sort: items without a date --> items by date descending.
  newData.sort((a, b) => {
    const dateA = a.dateStr;
    const dateB = b.dateStr;

    if (!dateA) return -1;
    if (!dateB) return 1;

    const formattedDateA = formatDateStr(dateA)!.dateObj.getTime();
    const formattedDateB = formatDateStr(dateB)!.dateObj.getTime();

    return formattedDateB - formattedDateA;
  });

  return newData;
};

const createTimelineData = (data: JoinedCredits) => {
  const timelineData: TimelineData = {};

  data.forEach((item) => {
    const isMovie = 'release_date' in item || 'title' in item;
    const isActor = 'character' in item && !('department' in item);
    const job = isActor ? item.character : item.job;
    const name = isMovie ? item.title : item.name;
    const departmentName = isActor ? 'Acting' : item.department;
    const departmentKey = departmentName.toLowerCase();
    const dateStr = isMovie ? item.release_date : item.first_air_date;
    const year = formatDateStr(dateStr)?.dateParts.year ?? null;
    const path = isMovie ? ROUTE_NAMES.movie : ROUTE_NAMES.tvShow;

    if (!timelineData[item.id]) {
      timelineData[item.id] = {
        id: item.id,
        name,
        year,
        dateStr,
        path: `/${path}`,

        employment: {
          [departmentKey]: {
            name: departmentName,
            value: job,
          },
        },
      };

      return;
    }

    const itemEmployment = timelineData[item.id].employment;

    if (itemEmployment[departmentKey]) {
      const itemDepartment = itemEmployment[departmentKey];

      itemDepartment.value += itemDepartment.value && job ? `, ${job}` : job;

      return;
    }

    itemEmployment[departmentKey] = {
      name: departmentName,
      value: job,
    };
  });

  return Object.values(timelineData);
};

const getTimelineData = ({
  movieCredits,
  tvCredits,
  filterBy,
}: {
  movieCredits: Person['movie_credits'] | undefined;
  tvCredits: Person['tv_credits'] | undefined;
  filterBy: FilterValue;
}) => {
  const { isData, isNeedInFiltering } = getCreditsState(movieCredits, tvCredits);

  if (!isData) return { data: null, isNeedInFiltering: false };

  const filteredData = filterData({ movieCredits, tvCredits, filterBy });
  const timeLineData = createTimelineData(filteredData);
  const sortedTimeLineData = sortByDateDescending(timeLineData);

  return { data: sortedTimeLineData, isNeedInFiltering };
};

export const CreditsList = () => {
  const { id } = useParams<IdParam>();
  const personQuery = useGetPersonQuery(id);

  const { filterBy, filterByHandler } = useFilter(filterConfig.all.value);

  const timelineData = getTimelineData({
    movieCredits: personQuery.data?.movie_credits,
    tvCredits: personQuery.data?.tv_credits,
    filterBy,
  });

  return (
    <Section>
      <SectionTitle title="Projects" />

      {!personQuery.isLoading && !timelineData.isNeedInFiltering ? null : (
        <SelectorContainer>
          <Filter
            isLoading={personQuery.isLoading}
            config={filterConfig}
            filterBy={filterBy}
            filterByHandler={filterByHandler}
          />
        </SelectorContainer>
      )}

      {!personQuery.isLoading && !timelineData.data ? (
        <NoContent message="We don't have added any projects." />
      ) : (
        <ProjectsTimeline isLoading={personQuery.isLoading} data={timelineData.data} />
      )}
    </Section>
  );
};
