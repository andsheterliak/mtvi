import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => {
  return {
    socialLink: {
      color: theme.palette.text.primary,
      display: 'inline-block',

      '&:not(:last-child)': {
        marginRight: '15px',
      },
    },

    skeleton: {
      display: 'inline-block',
      width: 35,
      height: 35,
      borderRadius: '12px',

      '&:not(:last-child)': {
        marginRight: '15px',
      },
    },
  };
});

export const SocialLink = ({ href, id, Icon, isLoading }) => {
  const classes = useStyles();

  if (isLoading) {
    return <Skeleton className={classes.skeleton} variant="rect" />;
  }

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
