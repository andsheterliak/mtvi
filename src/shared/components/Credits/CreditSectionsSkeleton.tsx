import { Section, SectionTitle } from '~/shared/components/section';
import { Separator } from '~/shared/components/Separator';
import { CreditSection } from './CreditSection';

export const CreditSectionsSkeleton = () => {
  return (
    <>
      <CreditSection isLoading={true} />

      <Separator />

      <Section>
        <SectionTitle isLoading={true} />

        <CreditSection isSubsection={true} isLoading={true} />
      </Section>
    </>
  );
};
