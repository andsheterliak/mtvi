import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { IsSpacing } from '~/shared/types';

export type PageTitleName = string;

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    spacing: {
      margin: '20px 0 20px 20px',

      [breakpoints.up('md')]: {
        margin: '40px 0 40px 20px',
      },
    },
  });
});

type Props = {
  titleName: PageTitleName;
  isSpacing?: IsSpacing;
};

export const RouteHeader = ({ titleName, isSpacing = true }: Props) => {
  const classes = useStyles();

  const rootClasses = classNames({
    [classes.spacing]: isSpacing,
  });

  return (
    <Typography color="textPrimary" variant="h4" component="h1" className={rootClasses}>
      {titleName}
    </Typography>
  );
};
