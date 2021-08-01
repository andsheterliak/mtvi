import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { getHyphenOrData } from '~/utils';
import { AspectRatio } from '~/components/AspectRatio';

const useStyles = makeStyles(() => ({
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
}));

export const CreditCard = ({ imgPath, name, info, path, isLoading }) => {
  const classes = useStyles();

  const content = (
    <>
      <AspectRatio aspectRatio="1:1" imgWrapperClasses={classes.imgWrapper}>
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img alt={name ?? ''} data-src={imgPath} />
        )}
      </AspectRatio>

      <CardContent className={classes.content}>
        <Typography component="p" color="textPrimary" variant="body1">
          {isLoading ? <Skeleton width="80%" /> : getHyphenOrData(name)}
        </Typography>

        <Typography component="p" variant="body2" color="textSecondary">
          {isLoading ? <Skeleton /> : getHyphenOrData(info)}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <Card>
      {isLoading ? (
        <div className={classes.action}>{content}</div>
      ) : (
        <CardActionArea component={Link} to={path} className={classes.action}>
          {content}
        </CardActionArea>
      )}
    </Card>
  );
};
