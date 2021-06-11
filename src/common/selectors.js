import { createSelector } from '@reduxjs/toolkit';

import { VIDEO_TYPES } from './tmdb-config';
import { ifIsData, getTopItems } from './utils/getData';

export const createGetTopCastInstance = (getCastSelector) => {
  return createSelector(getCastSelector, (cast) => getTopItems(cast));
};

const creditNameToTitle = (name) => {
  return name
    .split('_')
    .map((namePart) => `${namePart[0].toUpperCase()}${namePart.substring(1)}`)
    .join(' ');
};

export const createGetCreditsDataInstance = (getCreditsSelector) => {
  return createSelector(getCreditsSelector, (credits) => {
    if (!credits) return null;

    const isCredits = Object.values(credits).some((item) => {
      return ifIsData(item);
    });

    if (!isCredits) return null;

    const commonCredits = {};
    const crew = {};

    Object.entries(credits).forEach(([creditName, creditItems]) => {
      if (creditName === 'crew') return;
      if (!ifIsData(creditItems)) return;

      creditName = creditNameToTitle(creditName);

      commonCredits[creditName] = creditItems.map((item) => {
        const { id, profile_path: profilePath, name } = item;

        const info = item.roles
          ? item.roles
              .map((roleItem) => roleItem.character)
              .filter(Boolean)
              .join(', ')
          : item.character;

        return {
          name,
          info,
          id,
          profilePath,
        };
      });
    });

    if (!ifIsData(credits.crew)) return commonCredits;

    credits.crew.forEach((item) => {
      const { department, name, id, profile_path: profilePath } = item;

      const info = item.jobs
        ? item.jobs.map((jobItem) => jobItem.job).join(', ')
        : item.job;

      if (!crew[department]) {
        crew[department] = {
          [id]: { name, info, id, profilePath },
        };

        return;
      }

      const savedDepartment = crew[department];

      if (savedDepartment[id]) {
        const savedItem = savedDepartment[id];

        savedItem.info += savedItem.info ? `, ${info}` : info;

        return;
      }

      savedDepartment[id] = { name, info, id, profilePath };
    });

    return { ...commonCredits, Team: crew };
  });
};

export const createGetVideosDataInstance = (getVideos) => {
  return createSelector(getVideos, (videos) => {
    if (!videos) return null;

    const videosData = {};

    Object.values(VIDEO_TYPES).forEach(({ key, name }) => {
      if (key === VIDEO_TYPES.openingCredits.key) return;
      videosData[key] = { name, amount: 0, data: [] };
    });

    videos.forEach((video) => {
      if (video.site !== 'YouTube') return;

      if (video.type === VIDEO_TYPES.openingCredits.key) {
        videosData[video.type] = { name: video.type, amount: 0, data: [] };
      }

      const { type } = video;
      const mapValue = videosData[type];

      mapValue.amount += 1;
      mapValue.data.push(video);
    });

    return videosData;
  });
};
