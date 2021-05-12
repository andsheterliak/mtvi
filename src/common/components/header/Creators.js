import { Link as MUILink } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { ROUTE_NAMES } from '~common/constants';

const Creators = ({ creators }) => {
  const creatorsLength = creators.length;

  return creators.map(({ name, id }, index) => {
    const isComma = index < creatorsLength - 1;

    return (
      <MUILink
        color="inherit"
        key={id}
        component={Link}
        to={`${ROUTE_NAMES.person}/${id}`}
      >
        {name}
        {isComma && ', '}
      </MUILink>
    );
  });
};

export default Creators;
