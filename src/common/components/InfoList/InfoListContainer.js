import { makeStyles } from '@material-ui/core/styles';
import { arrayOf, element } from 'prop-types';

const useStyles = makeStyles(() => {
  return {
    list: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
  };
});

const InfoListContainer = ({ children }) => {
  const classes = useStyles();

  return <ul className={classes.list}>{children}</ul>;
};

InfoListContainer.propTypes = {
  children: arrayOf(element).isRequired,
};

export default InfoListContainer;
