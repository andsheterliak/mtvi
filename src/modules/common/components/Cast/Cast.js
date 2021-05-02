import { string } from 'prop-types';
import types from '~common/types';

import SeeAllLink from '~components/SeeAllLink';
import Section from '../Section';
import SectionTitle from '../SectionTitle';
import Slider from '../Slider/Slider';
import CastCards from './CastCards';

const Cast = ({ data, title, creditsPath, seeAllLinkName }) => {
  return (
    <Section>
      <SectionTitle title={title} />

      <Slider isLinks>
        <CastCards cardsData={data} />
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
