import { Fragment } from 'react';
import { Layout } from '~/shared/components/Layout';
import { Section, SectionTitle } from '~/shared/components/section';
import { Separator } from '~/shared/components/Separator';
import { RouteName } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { CreditSection } from './CreditSection';
import { CreditSectionsSkeleton } from './CreditSectionsSkeleton';
import { CreditsName } from './types';
import { CustomCredits, CustomCreditsData, CustomTeamCredits } from './utils';

type CreditSubsectionsProps = {
  routeName: RouteName;
  data: CustomTeamCredits;
};

const CreditSubsections = ({ data, routeName }: CreditSubsectionsProps) => {
  const items = Object.entries(data).map(([creditsName, creditsData]) => {
    return (
      <CreditSection
        key={creditsName}
        creditsData={creditsData}
        routeName={routeName}
        creditsName={creditsName}
        isSubsection={true}
      />
    );
  });

  return <>{items}</>;
};

const ifIsTeam = (
  customCredits: CustomCredits | CustomTeamCredits,
  name: CreditsName
): customCredits is CustomTeamCredits => {
  return name === 'Team';
};

type CreditSectionsProps = {
  isLoading: IsLoading;
  routeName: RouteName;
  data: CustomCreditsData;
};

export const CreditSections = ({ data, routeName, isLoading }: CreditSectionsProps) => {
  if (isLoading) return <CreditSectionsSkeleton />;

  const dataLength = Object.entries(data!).length;

  const credits = Object.entries(data!).map(
    ([creditsName, creditsData]: [CreditsName, CustomCredits | CustomTeamCredits], index) => {
      const isLastElement = index >= dataLength - 1;
      const separator = !isLastElement && <Separator />;

      if (ifIsTeam(creditsData, creditsName)) {
        return (
          <Fragment key={creditsName}>
            <Section>
              <SectionTitle title={creditsName} />

              <Layout>
                <CreditSubsections data={creditsData} routeName={routeName} />
              </Layout>
            </Section>

            {separator}
          </Fragment>
        );
      }

      return (
        <Fragment key={creditsName}>
          <CreditSection
            creditsData={creditsData}
            routeName={routeName}
            creditsName={creditsName}
          />

          {separator}
        </Fragment>
      );
    }
  );

  return <>{credits}</>;
};
