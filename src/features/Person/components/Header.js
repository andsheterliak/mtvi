import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

import { getImagePath } from '~common/utils/getData';
import HeaderDescription from '~components/header/Description';
import HeaderTitle from '~components/header/HeaderTitle';
import InfoList from '~components/InfoList';
import AspectRatio from '~components/AspectRatio';
import SocialLinks from './SocialLinks';

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

const Header = ({
  dataList,
  name,
  biography,
  imgData,
  externalIds,
  isLoading,
}) => {
  const classes = useStyles();

  const imgPath = getImagePath(imgData);

  return (
    <section className={classes.root}>
      <AspectRatio rootClasses={classes.imgRoot}>
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img src={imgPath} alt={name} />
        )}
      </AspectRatio>

      <div className={classes.inner}>
        {!isLoading && !name ? null : (
          <HeaderTitle isLoading={isLoading} title={name} />
        )}

        {!isLoading && !biography ? null : (
          <HeaderDescription isLoading={isLoading} description={biography} />
        )}

        <InfoList
          isLoading={isLoading}
          itemSkeletonAmount={4}
          dataList={dataList}
        />

        <SocialLinks isLoading={isLoading} externalIds={externalIds} />
      </div>
    </section>
  );
};

export default Header;
