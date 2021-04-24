import { node } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  optionContainer: {
    width: '100%',

    '&:not(:last-child)': {
      marginBottom: theme.spacing(4),
    },
  },
}));

const OptionContainer = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.optionContainer}>{children}</div>;
};

OptionContainer.propTypes = {
  children: node.isRequired,
};

export default OptionContainer;
