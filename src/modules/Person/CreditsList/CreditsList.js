import { useSelector } from 'react-redux';
import { useState } from 'react';

import { formatDataStr } from '~common/utils/date';
import { getPath } from '~common/utils/getData';

import Filter from '~components/Filter';
import SelectorContainer from '~components/SelectorContainer';
import Section from '~components/Section';
import SectionTitle from '~components/SectionTitle';
import ProjectsTimeline from '../components/ProjectsTimeline/ProjectsTimeline';

import filterConfig from './filterConfig';

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
  const { data } = useSelector((state) => state.person);

  const [filterBy, setFilterBy] = useState(filterConfig.all.value);

  const filterByHandler = (e) => {
    setFilterBy(e.target.value);
  };

  const credits = {
    movieCredits: data.movie_credits,
    tvCredits: data.tv_credits,
  };

  const { isData, isNeedInFiltering } = checkIfIsCredits(credits);

  if (!isData) return null;

  const timelineData = getTimelineData(credits, filterBy);

  return (
    <Section>
      <SectionTitle title="Projects" isSpacing={false} />

      {isNeedInFiltering && (
        <SelectorContainer>
          <Filter
            config={filterConfig}
            filterBy={filterBy}
            filterByHandler={filterByHandler}
          />
        </SelectorContainer>
      )}

      <ProjectsTimeline data={timelineData} />
    </Section>
  );
};

export default CreditsList;
