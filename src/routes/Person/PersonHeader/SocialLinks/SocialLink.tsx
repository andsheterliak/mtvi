import { Link } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { IsLoading } from '~/shared/types';
import { SocialLinkItem } from './types';

const useStyles = makeStyles(({ palette }) => {
  return createStyles({
    socialLink: {
      color: palette.text.primary,
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
  });
});

type Props = Partial<{
  isLoading: IsLoading;
  href: SocialLinkItem['href'];
  id: SocialLinkItem['id'];
  label: SocialLinkItem['label'];
  Icon: SocialLinkItem['icon'];
}>;

export const SocialLink = ({ href, id, label, Icon, isLoading }: Props) => {
  const classes = useStyles();

  if (isLoading) {
    return <Skeleton className={classes.skeleton} variant="rect" />;
  }

  return (
    <Link
      href={`${href}${id}`}
      aria-label={label}
      underline="none"
      target="_blank"
      rel="noopener"
      className={classes.socialLink}
    >
      {Icon && <Icon fontSize="large" />}
    </Link>
  );
};
