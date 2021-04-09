import { Link } from 'react-router-dom';
import { Typography, Link as MUILink } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';

import InfoList from '../../../common/components/InfoList';

import { getHyphenOrData } from '../../../common/utils/getData';

const useStyles = makeStyles(() => {
  const padding = 4;
  const sidePadding = 10;
  const oppositeContentWidth = 34;

  return {
    timeline: {
      padding: 0,
    },

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

const ProjectsTimeline = ({ data }) => {
  const classes = useStyles();

  const timelineItems = data.map((item) => {
    const infoList = <InfoList dataList={Object.values(item.employment)} />;

    return (
      <TimelineItem key={item.id}>
        <TimelineOppositeContent className={classes.oppositeContent}>
          <Typography color="textPrimary" variant="body2">
            {getHyphenOrData(item.year)}
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
            to={`/movies/${item.id}`}
          >
            {getHyphenOrData(item.name)}
          </MUILink>

          {infoList}
        </TimelineContent>
      </TimelineItem>
    );
  });

  return (
    <Timeline align="left" className={classes.timeline}>
      {timelineItems}
    </Timeline>
  );
};

export default ProjectsTimeline;
