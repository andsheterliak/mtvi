import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    certification: {
      padding: '1px 4px',
      border: `1px solid ${theme.palette.grey[800]}`,
    },
  };
});

export const Certification = ({ certification }) => {
  const classes = useStyles();

  return <span className={classes.certification}>{certification}</span>;
};
