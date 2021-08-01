import { Section, SectionTitle } from '~/components/section';
import { Separator } from '~/components/Separator';
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
