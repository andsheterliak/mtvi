import { makeStyles } from '@material-ui/core/styles';

import types from '@common/types';

const useStyles = makeStyles(() => {
  return {
    section: {
      width: '100%',
    },
  };
});

const Section = ({ children }) => {
  const classes = useStyles();

  return <section className={classes.section}>{children}</section>;
};

Section.propTypes = {
  children: types.containerChildren,
};

export default Section;
