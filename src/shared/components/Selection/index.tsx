import { CardHeader, Divider, Paper, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { ReactNode } from 'react';
import { ItemAmount } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { SelectionItem } from './SelectionItem';
import { Selected, SelectHandler, SelectionData } from './types';

export * from './types';
export * from './useSelection';

const useStyles = makeStyles(({ breakpoints }) => {
  return createStyles({
    title: {
      paddingTop: 0,
      paddingBottom: 0,
    },

    list: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: 'max-content',

      [breakpoints.up('md')]: {
        display: 'block',
      },
    },

    divider: {
      marginBottom: '10px',
    },

    paper: {
      maxWidth: '100%',
      overflowX: 'hidden',
    },
  });
});

type Props = {
  isLoading: IsLoading;
  itemSkeletonAmount: ItemAmount;
  selected: Selected;
  selectHandler: SelectHandler;
  title: string;
  data: SelectionData | null;
  tabPanelElement: ReactNode;
};

export const Selection = ({
  title,
  data,
  selectHandler,
  selected,
  isLoading,
  itemSkeletonAmount,
  tabPanelElement,
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  let items;

  if (isLoading) {
    items = Array(itemSkeletonAmount)
      .fill('')
      .map((_, index) => {
        return (
          <Tab
            key={index}
            value={`${index}`}
            disabled
            label={<SelectionItem key={index} isLoading={true} />}
          />
        );
      });
  } else {
    items = Object.entries(data!).map(([key, { name, amount }]) => {
      const item = <SelectionItem name={name} amount={amount} />;

      return (
        <Tab
          key={key}
          label={item}
          value={key}
          id={`nav-tab-${key}`}
          aria-controls={`nav-tabpanel-${key}`}
        />
      );
    });
  }

  const ariaLabelledby = 'selectionBar';

  return (
    <>
      <Paper className={classes.paper}>
        <CardHeader
          id={ariaLabelledby}
          component="h3"
          titleTypographyProps={{ color: 'textPrimary' }}
          title={title}
          className={classes.title}
        />

        <Divider className={classes.divider} />

        <Tabs
          className={classes.title}
          value={isLoading ? `${0}` : selected}
          orientation={matches ? 'vertical' : 'horizontal'}
          variant={matches ? 'standard' : 'scrollable'}
          onChange={(event, newValue: Selected) => selectHandler(newValue)}
          aria-labelledby={ariaLabelledby}
          indicatorColor="primary"
        >
          {items}
        </Tabs>
      </Paper>

      <div role="tabpanel" id={`nav-tabpanel-${selected}`} aria-labelledby={`nav-tab-${selected}`}>
        {tabPanelElement}
      </div>
    </>
  );
};
