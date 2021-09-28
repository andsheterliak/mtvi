import { RovingTabIndexProvider } from 'react-roving-tabindex';
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
  const ariaLabelledby = 'topCast';

  const content =
    !isLoading && (!data || data.length === 0) ? (
      <NoContent message="We don't have added any cast." />
    ) : (
      <Slider ariaLabelledby={ariaLabelledby}>
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
      <SectionTitle id={ariaLabelledby} title={title} />

      {isLoading ? content : <RovingTabIndexProvider>{content}</RovingTabIndexProvider>}

      <SeeAllLink path={creditsPath}>{seeAllLinkName}</SeeAllLink>
    </Section>
  );
};
