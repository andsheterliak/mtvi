import { Link as MUILink } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Creators = ({ creators, routeName }) => {
  const creatorsLength = creators.length;

  return creators.map(({ name, id }, index) => {
    const isComma = index < creatorsLength - 1;

    return (
      <MUILink
        color="inherit"
        key={id}
        component={Link}
        to={`/${routeName}/${id}`}
      >
        {name}
        {isComma && ', '}
      </MUILink>
    );
  });
};

export default Creators;
