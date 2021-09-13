import { Cast, TVShowCast } from '~/api/tmdb';
import { CardsGridRow } from '~/shared/components/grids';
import { NoContent } from '~/shared/components/NoContent';
import { Section, SectionTitle } from '~/shared/components/section';
import { SeeAllLink } from '~/shared/components/SeeAllLink';
import { Slider } from '~/shared/components/Slider';
import { ItemAmount, RouteName } from '~/shared/constants';
import { IsLoading, Path } from '~/shared/types';
import { CastCards } from './CastCards';

type Props = {
  isLoading: IsLoading;
  creditsPath: Path;
  title: string;
  seeAllLinkName: string;
  routeName: RouteName;
  castAmount: ItemAmount;
  data: Cast | TVShowCast | undefined;
};

export const TopCast = ({
  data,
  title,
  creditsPath,
  seeAllLinkName,
  routeName,
  isLoading,
  castAmount,
}: Props) => {
  const content =
    !isLoading && (!data || data.length === 0) ? (
      <NoContent message="We don't have added any cast." />
    ) : (
      <Slider isLoading={isLoading}>
        <CardsGridRow>
          <CastCards
            isLoading={isLoading}
            castData={data}
            routeName={routeName}
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
