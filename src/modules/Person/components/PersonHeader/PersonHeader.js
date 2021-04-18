import { makeStyles } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import HeaderDescription from '../../../common/components/PageHeader/HeaderDescription';
import HeaderTitle from '../../../common/components/PageHeader/HeaderTitle';
import InfoList from '../../../common/components/InfoList/InfoList';
import SocialLinks from './SocialLinks/SocialLinks';

import { IMG_BASE_URL, IMG_SIZES } from '../../../common/tmdb-config';
import noUserPhotoImg from '../../../../assets/img/no-user-photo.svg';
import { checkIfIsData } from '../../../common/utils/getData';

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

const PersonHeader = ({
  dataList,
  name,
  biography,
  profilePath,
  externalIds,
}) => {
  const classes = useStyles();

  const profileImg = profilePath
    ? `${IMG_BASE_URL}${IMG_SIZES.profile}${profilePath}`
    : noUserPhotoImg;

  const socialLinksMap = [];

  if (externalIds.facebook_id) {
    socialLinksMap.push({
      key: 'facebook_id',
      id: externalIds.facebook_id,
      href: 'https://www.facebook.com/',
      icon: FacebookIcon,
    });
  }

  if (externalIds.instagram_id) {
    socialLinksMap.push({
      key: 'instagram_id',
      id: externalIds.instagram_id,
      href: 'https://www.instagram.com/',
      icon: InstagramIcon,
    });
  }

  if (externalIds.twitter_id) {
    socialLinksMap.push({
      key: 'twitter_id',
      id: externalIds.twitter_id,
      href: 'https://twitter.com/',
      icon: TwitterIcon,
    });
  }

  return (
    <section className={classes.infoBlock}>
      <img className={classes.img} alt={name} src={profileImg} />

      <div>
        {name && <HeaderTitle title={name} />}

        {biography && <HeaderDescription description={biography} />}

        <InfoList dataList={dataList} />

        {checkIfIsData(socialLinksMap) && (
          <SocialLinks socialLinksMap={socialLinksMap} />
        )}
      </div>
    </section>
  );
};

export default PersonHeader;
