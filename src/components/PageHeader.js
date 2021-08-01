import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { getImagePath } from '~/utils';
import { AspectRatio } from './AspectRatio';
import { Description, HeaderTitle } from './header';
import { InfoList } from './InfoList';

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

export const PageHeader = ({
  title,
  overview,
  dataList,
  imgData,
  isLoading,
}) => {
  const classes = useStyles();

  const imgPath = getImagePath(imgData);

  const img =
    !isLoading && !imgData.path ? null : (
      <AspectRatio aspectRatio="16:9" rootClasses={classes.imgRoot}>
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img
            srcSet={`
              ${imgPath.w780} 780w,
              ${imgPath.w1280} 1280w,
            `}
            alt=""
            className={classes.img}
          />
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
          <Description isLoading={isLoading} description={overview} />
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
