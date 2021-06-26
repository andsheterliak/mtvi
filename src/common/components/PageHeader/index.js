import { makeStyles } from '@material-ui/core/styles';

import { Skeleton } from '@material-ui/lab';
import { getImagePath } from '~common/utils/getData';

import InfoList from '~components/InfoList';
import HeaderTitle from '../header/HeaderTitle';
import HeaderDescription from '../header/Description';
import AspectRatio from '~components/AspectRatio';

const useStyles = makeStyles((theme) => {
  return {
    imgRoot: {
      maxHeight: '600px',
    },

    img: {
      objectFit: 'cover',
      objectPosition: 'top',
    },

    infoBlock: {
      [theme.breakpoints.up('sm')]: {
        padding: '10px 15px',
      },

      [theme.breakpoints.up('md')]: {
        padding: '10px 20px',
      },

      [theme.breakpoints.up('lg')]: {
        padding: '10px 45px',
      },
    },
  };
});

const PageHeader = ({ title, overview, dataList, imgData, isLoading }) => {
  const classes = useStyles();

  const imgPath = getImagePath(imgData);

  const img =
    !isLoading && !imgPath ? null : (
      <AspectRatio aspectRatio="16:9" rootClasses={classes.imgRoot}>
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img src={imgPath} alt="" className={classes.img} />
        )}
      </AspectRatio>
    );

  return (
    <div>
      {img}

      <div className={classes.infoBlock}>
        {!isLoading && !title ? null : (
          <HeaderTitle isLoading={isLoading} title={title} />
        )}

        {!isLoading && !overview ? null : (
          <HeaderDescription isLoading={isLoading} description={overview} />
        )}

        <InfoList
          isLoading={isLoading}
          dataList={dataList}
          itemSkeletonAmount={7}
        />
      </div>
    </div>
  );
};

export default PageHeader;
