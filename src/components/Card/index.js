import {
  Card as MUiCard,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { getHyphenOrData } from '~/utils';
import { AspectRatio } from '~/components/AspectRatio';

const useCardStyles = makeStyles(({ spacing }) => {
  return {
    action: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'stretch',
    },

    content: {
      height: '100%',
      display: 'grid',
      gap: '10px',
      // Override default padding
      padding: `${spacing(1.5)}px !important`,
    },
  };
});

export const Card = ({ imgPath, title, path, subData, isLoading }) => {
  const classes = useCardStyles();

  const cardInner = (
    <>
      <AspectRatio>
        {isLoading ? (
          <Skeleton variant="rect" />
        ) : (
          <img alt={title} data-src={imgPath} />
        )}
      </AspectRatio>

      <CardContent className={classes.content}>
        <Typography color="textPrimary" variant="body2" component="h2">
          {isLoading ? <Skeleton /> : getHyphenOrData(title)}
        </Typography>

        {subData}
      </CardContent>
    </>
  );

  return (
    <MUiCard elevation={isLoading ? 0 : 1}>
      {isLoading ? (
        <div className={classes.action}>{cardInner}</div>
      ) : (
        <CardActionArea component={Link} to={path} className={classes.action}>
          {cardInner}
        </CardActionArea>
      )}
    </MUiCard>
  );
};

export { CardSubInfo } from './CardSubInfo';
export { CardSubText } from './CardSubText';
