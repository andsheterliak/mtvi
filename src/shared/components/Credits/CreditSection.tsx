import { RovingTabIndexProvider } from 'react-roving-tabindex';
import { Section, SectionTitle } from '../section';
import { RouteName } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { CreditCards } from './CreditCards';
import { CreditsGrid } from './CreditsGrid';
import { CreditsName } from './types';
import { CustomCredits } from './utils';

type Props = Partial<{
  creditsName: CreditsName;
  routeName: RouteName;
  creditsData: CustomCredits;
  isSubsection: boolean;
  isLoading: IsLoading;
}>;

export const CreditSection = ({
  creditsName,
  routeName,
  creditsData,
  isSubsection,
  isLoading,
}: Props) => {
  return (
    <Section>
      <SectionTitle isSubtitle={isSubsection} title={creditsName} isLoading={isLoading} />

      <CreditsGrid>
        {isLoading ? (
          <CreditCards isLoading={isLoading} data={creditsData} routeName={routeName} />
        ) : (
          <RovingTabIndexProvider options={{ loopAround: true }}>
            {<CreditCards isLoading={isLoading} data={creditsData} routeName={routeName} />}
          </RovingTabIndexProvider>
        )}
      </CreditsGrid>
    </Section>
  );
};
