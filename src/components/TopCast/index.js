import { CardsGridRow } from '~/components/grids';
import { NoContent } from '~/components/NoContent';
import { Section, SectionTitle } from '~/components/section';
import { SeeAllLink } from '~/components/SeeAllLink';
import { Slider } from '~/components/Slider';
import { ifIsData } from '~/utils';
import { CastCards } from './CastCards';

export const TopCast = ({
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
