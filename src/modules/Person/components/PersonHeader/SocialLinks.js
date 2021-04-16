import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

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

const SocialLinks = ({ socialLinksMap }) => {
  const classes = useStyles();

  const socialLinks = socialLinksMap.map(({ key, id, href, icon: Icon }) => {
    if (!id) return null;

    return (
      <Link
        key={key}
        href={`${href}${id}`}
        underline="none"
        target="_blank"
        rel="noopener"
        className={classes.socialLink}
      >
        <Icon fontSize="large" />
      </Link>
    );
  });

  return socialLinks;
};

export default SocialLinks;
