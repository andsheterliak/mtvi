import { makeStyles } from '@material-ui/core/styles';
import { Timeline } from '@material-ui/lab';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  timeline: {
    padding: 0,
    margin: 0,
  },
});

export const TimelineContainer = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return (
    <Timeline align="left" className={classes.timeline}>
      {children}
    </Timeline>
  );
};
