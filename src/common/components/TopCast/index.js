import types from '~common/types';

import SeeAllLink from '~components/SeeAllLink';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import Slider from '~components/Slider';
import CardsGridRow from '~components/grids/CardsGridRow';
import CastCards from './CastCards';

const TopCast = ({ data, title, creditsPath, seeAllLinkName }) => {
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

TopCast.propTypes = {
  data: types.specific.cardsData,
  title: types.generic.title.isRequired,
  creditsPath: types.generic.path.isRequired,
  seeAllLinkName: types.specific.seeAllLinkName,
};

export default TopCast;
