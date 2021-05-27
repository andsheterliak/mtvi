import { Card, CardHeader, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Slider, { useSlider } from '~components/Slider';

import SelectionItems from './SelectionItems';

export { default as useSelectionBar } from './useSelectionBar';

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: 'hsl(0, 0%, 0%, 13%)',
  },

  list: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',

    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}));

const SelectionBar = ({ title, data, selectHandler, selected }) => {
  const classes = useStyles();
  const {
    sliderRef,
    destroyMomentum,
    initSliderHandler,
    preventDragHandler,
  } = useSlider();

  return (
    <Card raised>
      <CardHeader
        titleTypographyProps={{ color: 'textPrimary' }}
        title={title}
        className={classes.title}
      />

      <Slider
        padding="0"
        sliderRef={sliderRef}
        destroyMomentum={destroyMomentum}
        initSliderHandler={initSliderHandler}
        preventDragHandler={preventDragHandler}
      >
        <List component="div" className={classes.list}>
          <SelectionItems
            data={data}
            selectHandler={selectHandler}
            selected={selected}
          />
        </List>
      </Slider>
    </Card>
  );
};

export default SelectionBar;
