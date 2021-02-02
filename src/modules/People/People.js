import { Container } from '@material-ui/core';
import RouteHeader from '../common/components/RouteHeader';

const People = ({ name }) => {
  return (
    <Container maxWidth="xl">
      <RouteHeader routeName={name} />
    </Container>
  );
};

export default People;
