import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import CreditCards from './CreditCards';
import CreditsGrid from './CreditsGrid';

const CreditSection = ({
  creditsName,
  routeName,
  imgData,
  creditsData = {},
  isSubsection,
  isLoading,
}) => {
  return (
    <Section>
      <SectionTitle
        isSubtitle={isSubsection}
        title={creditsName}
        isLoading={isLoading}
      />

      <CreditsGrid>
        <CreditCards
          isLoading={isLoading}
          data={Object.values(creditsData)}
          routeName={routeName}
          imgData={imgData}
        />
      </CreditsGrid>
    </Section>
  );
};

export default CreditSection;
