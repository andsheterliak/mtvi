import { makeStyles } from '@material-ui/core/styles';

import { string } from 'prop-types';

const useStyles = makeStyles((theme) => {
  return {
    certification: {
      padding: '1px 4px',
      border: `1px solid ${theme.palette.grey[800]}`,
    },
  };
});

const Certification = ({ certification }) => {
  const classes = useStyles();

  return <span className={classes.certification}>{certification}</span>;
};

Certification.propTypes = {
  certification: string.isRequired,
};

export default Certification;
