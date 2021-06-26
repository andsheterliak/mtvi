import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import Separator from '~components/Separator';
import CreditSection from './CreditSection';

const CreditSectionsSkeleton = () => {
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

export default CreditSectionsSkeleton;
