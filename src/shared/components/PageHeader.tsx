import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import { ImagePath, IMG_BASE_URL, IMG_SIZES, Name, Overview } from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image-wide.svg';
import { IsLoading } from '~/shared/types';
import { getImagePath } from '~/shared/utils';
import { LAZY_IMG_CLASS_NAME } from '../constants';
import { AspectRatio } from './AspectRatio';
import { Description, HeaderTitle } from './header';
import { DataList, InfoList } from './InfoList';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    imgRoot: {
      maxHeight: '600px',
    },

    img: {
      objectFit: 'cover',
      objectPosition: 'top',
    },

    infoBlock: {
      [breakpoints.up('sm')]: {
        padding: '10px 15px',
      },

      [breakpoints.up('md')]: {
        padding: '10px 20px',
      },

      [breakpoints.up('lg')]: {
        padding: '10px 45px',
      },
    },
  });
});

type Props = {
  isLoading: IsLoading;
  imagePath: ImagePath | undefined;
  title: Name | undefined;
  overview: Overview | null | undefined;
  dataList: DataList;
};

export const PageHeader = ({ title, overview, dataList, imagePath, isLoading }: Props) => {
  const classes = useStyles();

  const imgPath = getImagePath({
    basePath: IMG_BASE_URL,
    size: IMG_SIZES.backdrop,
    path: imagePath,
    fallback: noImageImg,
  });

  const img = (
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
          className={classNames(LAZY_IMG_CLASS_NAME, { [classes.img]: imagePath })}
        />
      )}
    </AspectRatio>
  );

  return (
    <div>
      {img}

      <div className={classes.infoBlock}>
        {!isLoading && !title ? null : <HeaderTitle isLoading={isLoading} title={title} />}

        {!isLoading && !overview ? null : (
          <Description isLoading={isLoading} description={overview} />
        )}

        <InfoList isLoading={isLoading} dataList={dataList} itemSkeletonAmount={7} />
      </div>
    </div>
  );
};
