import SeeAllLink from '~components/SeeAllLink';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import Slider, { useSlider } from '~components/Slider';
import CardsGridRow from '~components/grids/CardsGridRow';
import CastCards from './CastCards';
import { checkIfIsData } from '~common/utils/getData';
import NoContent from '~components/NoContent';

const TopCast = ({ data, title, creditsPath, seeAllLinkName }) => {
  const {
    sliderRef,
    destroyMomentum,
    initSliderHandler,
    preventDragHandler,
  } = useSlider();

  const content = checkIfIsData(data) ? (
    <Slider
      sliderRef={sliderRef}
      destroyMomentum={destroyMomentum}
      initSliderHandler={initSliderHandler}
      preventDragHandler={preventDragHandler}
    >
      <CardsGridRow>
        <CastCards cardsData={data} />
      </CardsGridRow>
    </Slider>
  ) : (
    <NoContent message="We don't have added any cast." />
  );

  return (
    <Section>
      <SectionTitle title={title} />

      {content}

      <SeeAllLink path={creditsPath}>{seeAllLinkName}</SeeAllLink>
    </Section>
  );
};

export default TopCast;
