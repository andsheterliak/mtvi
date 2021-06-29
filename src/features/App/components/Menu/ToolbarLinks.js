import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Links from './Links';

const useStyles = makeStyles(({ breakpoints, extraBreakpoints }) => {
  return {
    list: {
      display: 'none',
      gridAutoFlow: 'column',
      gap: 4,

      [breakpoints.up(extraBreakpoints.sx)]: {
        display: 'grid',
      },
    },

    link: {
      padding: '2px 12px 2px 12px',
    },
  };
});

const ToolbarLinks = ({ routes, locationPathname }) => {
  const classes = useStyles();

  return (
    <List className={classes.list} component="nav" aria-label="main navigation">
      <Links
        routes={routes}
        locationPathname={locationPathname}
        listItemProps={{ className: classes.link }}
      />
    </List>
  );
};

export default ToolbarLinks;
