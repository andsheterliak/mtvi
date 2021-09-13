import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles(({ spacing }) => {
  return createStyles({
    optionContainer: {
      width: '100%',

      '&:not(:last-child)': {
        marginBottom: spacing(4),
      },
    },
  });
});

export const OptionContainer = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return <div className={classes.optionContainer}>{children}</div>;
};
