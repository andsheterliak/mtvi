import { string } from 'prop-types';
import types from '~common/types';

import SeeAllLink from '~components/SeeAllLink';
import Section from '~components/Section';
import SectionTitle from '~components/SectionTitle';
import Slider from '~components/Slider';
import CardsGridRow from '~components/grids/CardsGridRow';
import CastCards from './CastCards';

const Cast = ({ data, title, creditsPath, seeAllLinkName }) => {
  return (
    <Section>
      <SectionTitle title={title} />

      <Slider isLinks>
        <CardsGridRow>
          <CastCards cardsData={data} />
        </CardsGridRow>
      </Slider>

      <SeeAllLink path={creditsPath}>{seeAllLinkName}</SeeAllLink>
    </Section>
  );
};

Cast.propTypes = {
  data: types.cardsData,
  title: types.title.isRequired,
  creditsPath: types.path,
  seeAllLinkName: string.isRequired,
};

export default Cast;
