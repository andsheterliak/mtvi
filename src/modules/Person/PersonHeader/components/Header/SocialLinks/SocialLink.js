import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { number, object, oneOfType, string } from 'prop-types';

const useStyles = makeStyles((theme) => {
  return {
    socialLink: {
      color: theme.palette.text.primary,
      display: 'inline-block',

      '&:not(:last-child)': {
        marginRight: '15px',
      },
    },
  };
});

const SocialLink = ({ href, id, Icon }) => {
  const classes = useStyles();

  return (
    <Link
      href={`${href}${id}`}
      underline="none"
      target="_blank"
      rel="noopener"
      className={classes.socialLink}
    >
      <Icon fontSize="large" />
    </Link>
  );
};

SocialLink.propTypes = {
  href: string.isRequired,
  id: oneOfType([string, number]).isRequired,
  Icon: object.isRequired,
};

export default SocialLink;
