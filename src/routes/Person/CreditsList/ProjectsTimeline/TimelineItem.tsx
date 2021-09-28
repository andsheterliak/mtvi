import { Link as MUILink, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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
import { InfoList } from '~/shared/components';
import { FALLBACK_VALUE } from '~/shared/constants';
import { useRovingTabindex } from '~/shared/hooks';
import { IsLoading } from '~/shared/types';
import { TimelineEmploymentItem, TimelineItem as TimelineDataItem } from '../types';

const useStyles = makeStyles(() => {
  const padding = 4;
  const sidePadding = 10;
  const oppositeContentWidth = 34;

  return createStyles({
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
  });
});

type Props = Partial<{
  isLoading: IsLoading;
  path: TimelineDataItem['path'];
  year: TimelineDataItem['year'];
  name: TimelineDataItem['name'];
  infoListData: TimelineEmploymentItem[];
}>;

export const TimelineItem = ({ path, year, name, infoListData, isLoading }: Props) => {
  const classes = useStyles();
  const rovingTabindex = useRovingTabindex<HTMLAnchorElement>();

  return (
    <MUITimelineItem>
      <TimelineOppositeContent className={classes.oppositeContent}>
        <Typography color="textPrimary" variant="body2">
          {isLoading ? <Skeleton width={34} /> : year ?? FALLBACK_VALUE}
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
            {...rovingTabindex}
            className={classes.link}
            variant="body1"
            color="textPrimary"
            gutterBottom
            component={Link}
            to={path!}
          >
            {name || FALLBACK_VALUE}
          </MUILink>
        )}

        <InfoList isLoading={isLoading!} itemSkeletonAmount={2} dataList={infoListData!} />
      </TimelineContent>
    </MUITimelineItem>
  );
};
