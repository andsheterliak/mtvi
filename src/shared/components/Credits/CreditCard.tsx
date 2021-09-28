import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { AspectRatio } from '~/shared/components/AspectRatio';
import { FALLBACK_VALUE, LAZY_IMG_CLASS_NAME } from '~/shared/constants';
import { useRovingTabindex } from '~/shared/hooks';
import { IsLoading, Path } from '~/shared/types';
import { CustomImagePath } from '~/shared/utils';
import { CustomCredit } from './utils';

const useStyles = makeStyles({
  action: {
    display: 'flex',
    justifyContent: 'start',
    padding: '5px 0 5px 5px',
    height: '100%',
  },

  imgWrapper: {
    width: '100px',
    borderRadius: '50%',
    flexShrink: 0,
  },

  content: {
    width: '100%',
    display: 'grid',
    gap: '5px',
    alignContent: 'center',
  },
});

type Props = Partial<{
  isLoading: IsLoading;
  imgPath: CustomImagePath;
  name: CustomCredit['name'];
  info: CustomCredit['info'];
  path: Path;
}>;

export const CreditCard = ({ imgPath, name, info, path, isLoading }: Props) => {
  const classes = useStyles();
  const rovingTabindex = useRovingTabindex<HTMLAnchorElement>();

  const content = (
    <>
      <AspectRatio aspectRatio="1:1" imgWrapperClasses={classes.imgWrapper}>
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img className={LAZY_IMG_CLASS_NAME} alt={name ?? ''} data-src={imgPath} />
        )}
      </AspectRatio>

      <CardContent className={classes.content}>
        <Typography component="h4" color="textPrimary" variant="body1">
          {isLoading ? <Skeleton width="80%" /> : name || FALLBACK_VALUE}
        </Typography>

        <Typography component="p" variant="body2" color="textSecondary">
          {isLoading ? <Skeleton /> : info || FALLBACK_VALUE}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <Card>
      {isLoading ? (
        <div className={classes.action}>{content}</div>
      ) : (
        <CardActionArea
          {...rovingTabindex}
          component={Link}
          role="link"
          to={path!}
          className={classes.action}
        >
          {content}
        </CardActionArea>
      )}
    </Card>
  );
};
