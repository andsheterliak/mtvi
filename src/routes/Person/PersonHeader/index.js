import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { createSelector } from '@reduxjs/toolkit';
import { IMG_BASE_URL, IMG_SIZES } from '~/api/tmdb';
import noUserPhotoImg from '~/assets/img/no-user-photo.svg';
import {
  AspectRatio,
  Description,
  HeaderTitle,
  InfoList,
} from '~/shared/components';
import { formatDataStr, getAge, getImagePath } from '~/shared/utils';
import { getData } from '../personSelectors';
import { SocialLinks } from './SocialLinks';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',

      '& > :first-child': {
        alignSelf: 'center',

        [theme.breakpoints.up('md')]: {
          marginRight: '36px',
          alignSelf: 'start',
        },
      },

      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
    },

    inner: {
      flexGrow: 1,
    },

    imgRoot: {
      flexShrink: 0,
      width: '250px',
      borderRadius: '5px',

      [theme.breakpoints.up('sm')]: {
        width: '350px',
      },
    },
  };
});

const getGender = (gender) => {
  if (!gender) return null;

  return gender === 1 ? 'Female' : 'Male';
};

const getLifeDates = (birthday, deathday) => {
  if (deathday) {
    const { dateParts } = formatDataStr(birthday);
    const { dateObj, dateStr: deathDateStr } = formatDataStr(deathday);

    deathday = `${deathDateStr} (${getAge(dateParts, dateObj)} years old)`;
  }

  if (birthday) {
    const { dateStr, dateParts } = formatDataStr(birthday);

    birthday = deathday
      ? dateStr
      : `${dateStr} (${getAge(dateParts)} years old)`;
  }

  return { birthday, deathday };
};

const getDataList = createSelector(getData, (data) => {
  if (!data) return null;

  const dataList = [];

  const { birthday, deathday } = getLifeDates(data.birthday, data.deathday);

  dataList.push({
    name: 'Birthday',
    value: birthday,
  });

  if (deathday)
    dataList.push({
      name: 'Day of death',
      value: deathday,
    });

  dataList.push({
    name: 'Place of birth',
    value: data.place_of_birth,
  });

  dataList.push({
    name: 'Gender',
    value: getGender(data.gender),
  });

  dataList.push({
    name: 'Known for',
    value: data.known_for_department,
  });

  return dataList;
});

export const PersonHeader = ({ isLoading, data }) => {
  const classes = useStyles();
  const dataList = getDataList(data);

  return (
    <section className={classes.root}>
      <AspectRatio rootClasses={classes.imgRoot}>
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img
            src={getImagePath({
              basePath: IMG_BASE_URL,
              size: IMG_SIZES.profile.h632,
              path: data?.profile_path,
              fallback: noUserPhotoImg,
            })}
            alt={data?.name}
          />
        )}
      </AspectRatio>

      <div className={classes.inner}>
        {!isLoading && !data?.name ? null : (
          <HeaderTitle isLoading={isLoading} title={data?.name} />
        )}

        {!isLoading && !data?.biography ? null : (
          <Description isLoading={isLoading} description={data?.biography} />
        )}

        <InfoList
          isLoading={isLoading}
          itemSkeletonAmount={4}
          dataList={dataList}
        />

        <SocialLinks isLoading={isLoading} externalIds={data?.external_ids} />
      </div>
    </section>
  );
};
