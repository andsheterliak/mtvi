import { makeStyles } from '@material-ui/core/styles';
import { Timeline } from '@material-ui/lab';
import { arrayOf, element } from 'prop-types';

const useStyles = makeStyles(() => {
  return {
    timeline: {
      padding: 0,
      margin: 0,
    },
  };
});

const TimelineContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Timeline align="left" className={classes.timeline}>
      {children}
    </Timeline>
  );
};

TimelineContainer.propTypes = {
  children: arrayOf(element).isRequired,
};

export default TimelineContainer;
