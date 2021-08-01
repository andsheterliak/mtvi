import { Link as MUILink, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Skeleton,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem as MUITimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { InfoList } from '~/components';
import { getHyphenOrData } from '~/utils';

const useStyles = makeStyles(() => {
  const padding = 4;
  const sidePadding = 10;
  const oppositeContentWidth = 34;

  return {
    oppositeContent: {
      minWidth: `${oppositeContentWidth + sidePadding}px`,
      flexGrow: 0,
      padding: `${padding}px ${sidePadding}px ${padding}px 0`,
    },

    content: {
      padding: `${padding}px 0 30px ${sidePadding}px`,
    },

    link: {
      display: 'inline-block',
    },
  };
});

export const TimelineItem = ({ path, year, name, infoListData, isLoading }) => {
  const classes = useStyles();

  return (
    <MUITimelineItem>
      <TimelineOppositeContent className={classes.oppositeContent}>
        <Typography color="textPrimary" variant="body2">
          {isLoading ? <Skeleton width={34} /> : getHyphenOrData(year)}
        </Typography>
      </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineDot color="primary" />

        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent className={classes.content}>
        {isLoading ? (
          <Typography className={classes.link} variant="body1" gutterBottom>
            <Skeleton width={220} />
          </Typography>
        ) : (
          <MUILink
            className={classes.link}
            variant="body1"
            color="textPrimary"
            gutterBottom
            component={Link}
            to={path}
          >
            {getHyphenOrData(name)}
          </MUILink>
        )}

        <InfoList
          isLoading={isLoading}
          itemSkeletonAmount={2}
          dataList={infoListData}
        />
      </TimelineContent>
    </MUITimelineItem>
  );
};
