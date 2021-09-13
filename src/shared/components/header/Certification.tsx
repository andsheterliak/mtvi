import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Certification as CertificationType } from '~/api/tmdb';

const useStyles = makeStyles(({ palette }) => {
  return createStyles({
    certification: {
      padding: '1px 4px',
      border: `1px solid ${palette.grey[800]}`,
    },
  });
});

export const Certification = ({ certification }: { certification: CertificationType }) => {
  const classes = useStyles();

  return <span className={classes.certification}>{certification}</span>;
};
