import { makeStyles } from '@material-ui/core/styles';

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
      // Avoid shifting when there aren't the social links
      '& > :first-child': {
        marginTop: '20px',
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

  return (
    <PageContainer>
      <section className={classes.infoBlock}>
        <img className={classes.img} alt={name} src={profileImg} />

        <div>
          <HeaderTitle title={name} />

          <HeaderDescription description={biography} />

          <InfoList dataList={dataList} />

          <div className={classes.socialLinks}>
            <SocialLinks externalIds={externalIds} />
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default PersonHeader;
