import { Link as MUILink } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { BaseCastItem } from '~/api/tmdb';
import { RouteName } from '~/shared/constants';

export type CreatorItems = {
  id: BaseCastItem['id'];
  name: BaseCastItem['name'];
}[];

type Props = {
  creators: CreatorItems;
  routeName: RouteName;
};

export const Creators = ({ creators, routeName }: Props) => {
  const creatorsLength = creators.length;

  const items = creators.map(({ name, id }, index) => {
    const isComma = index < creatorsLength - 1;

    return (
      <MUILink
        underline="always"
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

  return <>{items}</>;
};
