import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, ListItemText, MenuItem, Menu } from '@material-ui/core';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import IconBtn from '../IconBtn';

const useStyles = makeStyles(() => ({
  listIcon: {
    minWidth: '40px',
  },
}));

const SearchIn = ({
  searchPaths,
  searchInValue,
  menuFilterAnchorEl,
  isMenuFilterOpened,
  selectMenuFilterItemHandler,
  openMenuFilterHandler,
  closeMenuFilterHandler,
}) => {
  const classes = useStyles();

  const options = [
    { icon: MovieOutlinedIcon, name: 'Movies', routeName: searchPaths.movie },
    { icon: TvOutlinedIcon, name: 'TV Shows', routeName: searchPaths.tvShow },
    {
      icon: PersonOutlineOutlinedIcon,
      name: 'People',
      routeName: searchPaths.person,
    },
  ];

  const menuItems = options.map(({ name, icon: Icon, routeName }) => {
    return (
      <MenuItem
        dense
        key={routeName}
        onClick={(event) => selectMenuFilterItemHandler(event, routeName)}
        selected={routeName === searchInValue}
      >
        <ListItemIcon className={classes.listIcon}>
          <Icon fontSize="small" />
        </ListItemIcon>

        <ListItemText primary={name} />
      </MenuItem>
    );
  });

  return (
    <>
      <IconBtn
        ariaLabel="search filter menu"
        edge="end"
        size="sm"
        icon={FilterListOutlinedIcon}
        clickHandler={openMenuFilterHandler}
      />

      <Menu
        id="search filter menu"
        anchorEl={menuFilterAnchorEl}
        keepMounted
        open={isMenuFilterOpened}
        onClose={closeMenuFilterHandler}
      >
        {menuItems}
      </Menu>
    </>
  );
};

export default SearchIn;
