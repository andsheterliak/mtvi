import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
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

  const rootClasses = classNames({
    [classes.spacing]: isSpacing,
  });

  return <div className={rootClasses}>{children}</div>;
};

SocialLinksContainer.propTypes = {
  children: arrayOf(element).isRequired,
  isSpacing: types.specific.isSpacing,
};

export default SocialLinksContainer;
