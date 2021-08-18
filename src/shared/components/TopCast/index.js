import { CardsGridRow } from '~/shared/components/grids';
import { NoContent } from '~/shared/components/NoContent';
import { Section, SectionTitle } from '~/shared/components/section';
import { SeeAllLink } from '~/shared/components/SeeAllLink';
import { Slider } from '~/shared/components/Slider';
import { ifIsData } from '~/shared/utils';
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
      <Slider isLoading={isLoading}>
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
