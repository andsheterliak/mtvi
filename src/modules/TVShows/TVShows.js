import { Container } from '@material-ui/core';
import RouteHeader from '../common/components/RouteHeader';

const TVShows = ({ name }) => {
  return (
    <Container maxWidth="xl">
      <RouteHeader routeName={name} />
    </Container>
  );
};

export default TVShows;
