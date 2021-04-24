import { makeStyles } from '@material-ui/core/styles';
import { arrayOf, element } from 'prop-types';
import types from '~common/types';

const useStyles = makeStyles(() => {
  return {
    spacing: {
      marginTop: '20px',
    },
  };
});

const SocialLinksContainer = ({ children, isSpacing = true }) => {
  const classes = useStyles();
  const classNames = [classes.title];

  if (isSpacing) classNames.push(classes.spacing);

  return <div className={classNames.join(' ')}>{children}</div>;
};

SocialLinksContainer.propTypes = {
  children: arrayOf(element).isRequired,
  isSpacing: types.isSpacing,
};

export default SocialLinksContainer;
