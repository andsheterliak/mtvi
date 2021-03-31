import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => {
  return {
    socialLink: {
      color: theme.palette.grey[400],
      display: 'inline-block',

      '&:not(:last-child)': {
        marginRight: '15px',
      },
    },
  };
});

const SocialLinks = ({ externalIds }) => {
  const classes = useStyles();

  const socialLinksMap = [
    {
      key: 'facebook_id',
      id: externalIds.facebook_id,
      href: 'https://www.facebook.com/',
      icon: FacebookIcon,
    },

    {
      key: 'instagram_id',
      id: externalIds.instagram_id,
      href: 'https://www.instagram.com/',
      icon: InstagramIcon,
    },

    {
      key: 'twitter_id',
      id: externalIds.twitter_id,
      href: 'https://twitter.com/',
      icon: TwitterIcon,
    },
  ];

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
