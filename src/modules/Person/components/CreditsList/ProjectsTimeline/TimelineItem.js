import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem as MUITimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import { Typography, Link as MUILink } from '@material-ui/core';

import InfoList from '../../../../common/components/InfoList';

import { getHyphenOrData } from '../../../../common/utils/getData';

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

const TimelineItem = ({ path, year, name, infoListData }) => {
  const classes = useStyles();

  return (
    <MUITimelineItem>
      <TimelineOppositeContent className={classes.oppositeContent}>
        <Typography color="textPrimary" variant="body2">
          {getHyphenOrData(year)}
        </Typography>
      </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineDot />

        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent className={classes.content}>
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

        <InfoList dataList={infoListData} />
      </TimelineContent>
    </MUITimelineItem>
  );
};

export default TimelineItem;
