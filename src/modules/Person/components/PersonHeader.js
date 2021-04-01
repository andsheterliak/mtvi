import { makeStyles } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import PageContainer from '../../common/components/PageContainer';
import HeaderDescription from '../../common/components/PageHeader/HeaderDescription';
import HeaderTitle from '../../common/components/PageHeader/HeaderTitle';
import InfoList from '../../common/components/PageHeader/InfoList';
import SocialLinks from './SocialLinks';

import { IMG_BASE_URL, IMG_SIZES } from '../../common/tmdb-config';
import noUserPhotoImg from '../../../assets/img/no-user-photo.svg';

const useStyles = makeStyles((theme) => {
  return {
    img: {
      width: '100%',
      maxWidth: '350px',
      display: 'inline-block',
      borderRadius: '5px',
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

    biography: {
      marginBottom: '20px',
    },

    socialLinks: {
      marginTop: '20px',
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

  const isExternalIds = [
    externalIds.facebook_id,
    externalIds.instagram_id,
    externalIds.twitter_id,
  ].some((item) => item);

  const socialLinksMap = isExternalIds && [
    {
      key: 'facebook_id',
      id: externalIds.facebook_id,
      href: 'https://www.facebook.com/',
      icon: FacebookIcon,
    },

    {
      key: 'instagram_id',
      id: externalIds.instagram_id,
      href: 'https://www.instagram.com/',
      icon: InstagramIcon,
    },

    {
      key: 'twitter_id',
      id: externalIds.twitter_id,
      href: 'https://twitter.com/',
      icon: TwitterIcon,
    },
  ];

  return (
    <PageContainer>
      <section className={classes.infoBlock}>
        <img className={classes.img} alt={name} src={profileImg} />

        <div>
          {name && <HeaderTitle title={name} />}

          {biography && <HeaderDescription description={biography} />}

          <InfoList dataList={dataList} />

          {isExternalIds && (
            <div className={classes.socialLinks}>
              <SocialLinks socialLinksMap={socialLinksMap} />
            </div>
          )}
        </div>
      </section>
    </PageContainer>
  );
};

export default PersonHeader;
