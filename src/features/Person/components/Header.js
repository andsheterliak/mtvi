import { makeStyles } from '@material-ui/core/styles';

import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import noUserPhotoImg from '~assets/img/no-user-photo.svg';

import HeaderDescription from '~components/header/Description';
import HeaderTitle from '~components/header/HeaderTitle';
import InfoList from '~components/InfoList';
import SocialLinks from './SocialLinks';

const useStyles = makeStyles((theme) => {
  return {
    img: {
      width: '100%',
      maxWidth: '250px',
      display: 'inline-block',
      borderRadius: '5px',

      [theme.breakpoints.up('sm')]: {
        maxWidth: '350px',
      },
    },

    infoBlock: {
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
  };
});

const Header = ({ dataList, name, biography, profilePath, externalIds }) => {
  const classes = useStyles();

  const profileImg = profilePath
    ? `${IMG_BASE_URL}${IMG_SIZES.profile}${profilePath}`
    : noUserPhotoImg;

  return (
    <section className={classes.infoBlock}>
      <img className={classes.img} alt={name} src={profileImg} />

      <div>
        {name && <HeaderTitle title={name} />}

        {biography && <HeaderDescription description={biography} />}

        <InfoList dataList={dataList} />

        <SocialLinks externalIds={externalIds} />
      </div>
    </section>
  );
};

export default Header;
