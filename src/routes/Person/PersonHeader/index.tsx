import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, Person, PersonLifeDates, useGetPersonQuery } from '~/api/tmdb';
import noUserPhotoImg from '~/assets/img/no-user-photo.svg';
import { IdParam } from '~/routes/types';
import { AspectRatio, DataList, Description, HeaderTitle, InfoList } from '~/shared/components';
import { LAZY_IMG_CLASS_NAME } from '~/shared/constants';
import { formatDateStr, getImagePath } from '~/shared/utils';
import { SocialLinks } from './SocialLinks';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',

      '& > :first-child': {
        alignSelf: 'center',

        [breakpoints.up('md')]: {
          marginRight: '36px',
          alignSelf: 'start',
        },
      },

      [breakpoints.up('md')]: {
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

      [breakpoints.up('sm')]: {
        width: '350px',
      },
    },
  });
});

const getGender = (gender: Person['gender']) => {
  if (!gender) return null;

  return gender === 1 ? 'Female' : 'Male';
};

const getAge = (
  {
    year,
    month,
    day,
  }: {
    year: number;
    month: number;
    day: number;
  },
  deathday?: Date
) => {
  const today = deathday ?? new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();

  month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
};

const getLifeDates = (birthday: PersonLifeDates, deathday: PersonLifeDates) => {
  if (!deathday && !birthday) return null;

  let newDeathday;
  let newBirthday;

  if (deathday && birthday) {
    const birthdayData = formatDateStr(birthday)!;
    const deathdayData = formatDateStr(deathday)!;

    newDeathday = `${deathdayData?.dateStr} (${getAge(
      birthdayData.dateParts,
      deathdayData.dateObj
    )} years old)`;
  }

  if (birthday) {
    const birthdayData = formatDateStr(birthday)!;

    newBirthday = deathday
      ? birthdayData.dateStr
      : `${birthdayData.dateStr} (${getAge(birthdayData.dateParts)} years old)`;
  }

  return { birthday: newBirthday, deathday: newDeathday };
};

const getDataList = (data: Person | undefined) => {
  if (!data) return null;

  const dataList: DataList = [];

  const lifeDates = getLifeDates(data.birthday, data.deathday);

  dataList.push({
    name: 'Birthday',
    value: lifeDates?.birthday,
  });

  if (lifeDates?.deathday)
    dataList.push({
      name: 'Day of death',
      value: lifeDates?.deathday,
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
};

export const PersonHeader = () => {
  const classes = useStyles();
  const { id } = useParams<IdParam>();
  const personQuery = useGetPersonQuery(id);

  return (
    <section className={classes.root}>
      <AspectRatio rootClasses={classes.imgRoot}>
        {personQuery.isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img
            className={LAZY_IMG_CLASS_NAME}
            src={getImagePath({
              basePath: IMG_BASE_URL,
              size: IMG_SIZES.profile.h632,
              path: personQuery.data?.profile_path,
              fallback: noUserPhotoImg,
            })}
            alt={personQuery.data?.name}
          />
        )}
      </AspectRatio>

      <div className={classes.inner}>
        {!personQuery.isLoading && !personQuery.data?.name ? null : (
          <HeaderTitle isLoading={personQuery.isLoading} title={personQuery.data?.name} />
        )}

        {!personQuery.isLoading && !personQuery.data?.biography ? null : (
          <Description
            isLoading={personQuery.isLoading}
            description={personQuery.data?.biography}
          />
        )}

        <InfoList
          isLoading={personQuery.isLoading}
          itemSkeletonAmount={4}
          dataList={getDataList(personQuery.data)}
        />

        <SocialLinks
          isLoading={personQuery.isLoading}
          externalIds={personQuery.data?.external_ids}
        />
      </div>
    </section>
  );
};
