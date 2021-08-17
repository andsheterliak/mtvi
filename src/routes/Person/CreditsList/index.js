import { useParams } from 'react-router-dom';
import { useGetPersonQuery } from '~/api/tmdb';
import {
  Filter,
  NoContent,
  Section,
  SectionTitle,
  SelectorContainer,
  useFilter,
} from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { formatDataStr } from '~/shared/utils';
import { filterConfig } from './filterConfig';
import { ProjectsTimeline } from './ProjectsTimeline';

const getCreditsState = ({ movieCredits, tvCredits }) => {
  const isMovieCast = !!movieCredits?.cast?.length;
  const isMovieCrew = !!movieCredits?.crew?.length;

  const isTVCast = !!tvCredits?.cast?.length;
  const isTVCrew = !!tvCredits?.crew?.length;

  const isData = isMovieCast || isMovieCrew || isTVCast || isTVCrew;

  const isNeedInFiltering =
    (isMovieCast || isMovieCrew) && (isTVCast || isTVCrew);

  return { isData, isNeedInFiltering };
};

const filterData = ({ movieCredits, tvCredits, filterBy }) => {
  const filteredData = [];

  const movieCast = movieCredits?.cast;
  const movieCrew = movieCredits?.crew;

  const tvCast = tvCredits?.cast;
  const tvCrew = tvCredits?.crew;

  switch (filterBy) {
    case filterConfig.all.value:
      [movieCast, movieCrew, tvCast, tvCrew].forEach((item) => {
        if (item) filteredData.push(item);
      });
      break;

    case filterConfig.movies.value:
      [movieCast, movieCrew].forEach((item) => {
        if (item) filteredData.push(item);
      });
      break;

    case filterConfig.tvShows.value:
      [tvCast, tvCrew].forEach((item) => {
        if (item) filteredData.push(item);
      });
      break;

    default:
      break;
  }

  return filteredData.flat();
};

const sortByDateDescending = (data) => {
  const newData = [...data];

  // Sort: items without a date --> items by date descending.
  newData.sort((a, b) => {
    let dateA = a.dateStr;
    let dateB = b.dateStr;

    if (!dateA) return -1;
    if (!dateB) return 1;

    dateA = formatDataStr(dateA).dateObj.getTime();
    dateB = formatDataStr(dateB).dateObj.getTime();

    return dateB - dateA;
  });

  return newData;
};

const createTimelineData = (data) => {
  const timelineData = {};

  // Join all the items with the same id, (items from the API are duplicated if a person had several jobs and they differ only in those jobs).
  data.forEach((item) => {
    const isMovie = 'release_date' in item || 'title' in item;
    const isActor = 'character' in item && !('department' in item);
    const job = isActor ? item.character : item.job;
    const name = isMovie ? item.title : item.name;
    const departmentName = isActor ? 'Acting' : item.department;
    const departmentKey = departmentName.toLowerCase();
    const dateStr = isMovie ? item.release_date : item.first_air_date;
    const year = dateStr ? formatDataStr(dateStr).dateParts.year : null;
    const path = isMovie ? ROUTE_NAMES.movie : ROUTE_NAMES.tvShow;

    // If no timeline item with the 'id', create it.
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

    // If is created item with the same 'id', check if it has 'employment' with the 'departmentKey'.
    if (itemEmployment[departmentKey]) {
      const itemDepartment = itemEmployment[departmentKey];

      // If is a 'value', append new value from the current item. If no 'value', just add it.
      itemDepartment.value += itemDepartment.value && job ? `, ${job}` : job;

      return;
    }

    // If created item with the same 'id' hasn't an 'employment' with the 'departmentKey', create it.
    itemEmployment[departmentKey] = {
      name: departmentName,
      value: job,
    };
  });

  return Object.values(timelineData);
};

const getTimelineData = ({ movieCredits, tvCredits, filterBy }) => {
  const { isData, isNeedInFiltering } = getCreditsState({
    movieCredits,
    tvCredits,
  });

  if (!isData) return { data: null, isNeedInFiltering: false };

  let data;

  data = filterData({ movieCredits, tvCredits, filterBy });
  data = createTimelineData(data);
  data = sortByDateDescending(data);

  return { data, isNeedInFiltering };
};

export const CreditsList = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPersonQuery(id);

  const { filterBy, filterByHandler } = useFilter({
    initialValue: filterConfig.all.value,
  });

  const timelineData = getTimelineData({
    movieCredits: data?.movie_credits,
    tvCredits: data?.tv_credits,
    filterBy,
  });

  return (
    <Section>
      <SectionTitle title="Projects" />

      {!isLoading && !timelineData.isNeedInFiltering ? null : (
        <SelectorContainer>
          <Filter
            isLoading={isLoading}
            config={filterConfig}
            filterBy={filterBy}
            filterByHandler={filterByHandler}
          />
        </SelectorContainer>
      )}

      {!isLoading && !timelineData.data ? (
        <NoContent message="We don't have added any projects." />
      ) : (
        <ProjectsTimeline isLoading={isLoading} data={timelineData.data} />
      )}
    </Section>
  );
};
