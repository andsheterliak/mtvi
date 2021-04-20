import { useSelector } from 'react-redux';
import { useState } from 'react';

import Filter from '../../common/components/Filter/Filter';
import FilterContainer from '../../common/components/Filter/FilterContainer';
import ProjectsTimeline from './components/ProjectsTimeline/ProjectsTimeline';
import Section from '../../common/components/Section/Section';
import SectionTitle from '../../common/components/Section/SectionTitle';

import { formatDataStr } from '../../common/utils/date';
import filterConfig from './filterConfig';
import { getPath } from '../../common/utils/getData';

const checkIfIsCredits = (data) => {
  const isMovieCast = !!data.movieCredits?.cast?.length;
  const isMovieCrew = !!data.movieCredits?.crew?.length;

  const isTVCast = !!data.tvCredits?.cast?.length;
  const isTVCrew = !!data.tvCredits?.crew?.length;

  const isData = isMovieCast || isMovieCrew || isTVCast || isTVCrew;

  const isNeedInFiltering =
    (isMovieCast || isMovieCrew) && (isTVCast || isTVCrew);

  return { isData, isNeedInFiltering };
};

const filterData = (data, filterBy) => {
  const filteredData = [];

  const movieCast = data.movieCredits?.cast;
  const movieCrew = data.movieCredits?.crew;

  const tvCast = data.tvCredits?.cast;
  const tvCrew = data.tvCredits?.crew;

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

  data.forEach((item) => {
    const job = item.character || item.job;
    const name = item.title || item.name;
    const departmentName = item.department || 'Acting';
    const departmentKey = departmentName.toLowerCase();
    const dateStr = item.release_date || item.first_air_date;
    const year = dateStr && formatDataStr(dateStr).dateParts.year;

    const path = getPath({
      name: item.name,
      episodeCount: item.first_air_date,
      firstAirDate: item.episode_count,
    });

    if (!timelineData[item.id]) {
      timelineData[item.id] = {
        id: item.id,
        name,
        year,
        dateStr,
        path,

        // Doesn't need fallback
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

      if (itemDepartment.value) {
        itemDepartment.value += `, ${job}`;
      } else {
        itemDepartment.value = job;
      }

      return;
    }

    itemEmployment[departmentKey] = {
      name: departmentName,
      value: job,
    };
  });

  return Object.values(timelineData);
};

const getTimelineData = (data, filterBy) => {
  let timelineData;

  timelineData = filterData(data, filterBy);
  timelineData = createTimelineData(timelineData);
  timelineData = sortByDateDescending(timelineData);

  return timelineData;
};

const CreditsList = () => {
  const { person } = useSelector((state) => state.person);

  const [filterBy, setFilterBy] = useState(filterConfig.all.value);

  const filterByHandler = (e) => {
    setFilterBy(e.target.value);
  };

  const data = {
    movieCredits: person.movie_credits,
    tvCredits: person.tv_credits,
  };

  const { isData, isNeedInFiltering } = checkIfIsCredits(data);

  if (!isData) return null;

  const timelineData = getTimelineData(data, filterBy);

  return (
    <Section>
      <SectionTitle title="Projects" isSpacing={false} />

      {isNeedInFiltering && (
        <FilterContainer>
          <Filter
            config={filterConfig}
            filterBy={filterBy}
            filterByHandler={filterByHandler}
          />
        </FilterContainer>
      )}

      <ProjectsTimeline data={timelineData} />
    </Section>
  );
};

export default CreditsList;
