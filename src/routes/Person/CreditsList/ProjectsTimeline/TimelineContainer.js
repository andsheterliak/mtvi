import { makeStyles } from '@material-ui/core/styles';
import { Timeline } from '@material-ui/lab';

const useStyles = makeStyles(() => {
  return {
    timeline: {
      padding: 0,
      margin: 0,
    },
  };
});

export const TimelineContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Timeline align="left" className={classes.timeline}>
      {children}
    </Timeline>
  );
};
