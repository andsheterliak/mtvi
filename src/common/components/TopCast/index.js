import SeeAllLink from '~components/SeeAllLink';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import CardsGridRow from '~components/grids/CardsGridRow';
import CastCards from './CastCards';
import { ifIsData } from '~common/utils/getData';
import NoContent from '~components/NoContent';
import Slider from '~components/Slider';

const TopCast = ({
  data,
  title,
  creditsPath,
  seeAllLinkName,
  imgData,
  routeName,
  isLoading,
  castAmount,
}) => {
  const content =
    !isLoading && !ifIsData(data) ? (
      <NoContent message="We don't have added any cast." />
    ) : (
      <Slider>
        <CardsGridRow>
          <CastCards
            isLoading={isLoading}
            cardsData={data}
            routeName={routeName}
            imgData={imgData}
            castAmount={castAmount}
          />
        </CardsGridRow>
      </Slider>
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
