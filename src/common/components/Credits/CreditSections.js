import { Fragment } from 'react';

import Separator from '~components/Separator';
import Layout from '~components/Layout';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import CreditSection from './CreditSection';
import CreditSectionsSkeleton from './CreditSectionsSkeleton';

const CreditSubsections = ({ data, routeName, imgData }) => {
  return Object.entries(data).map(([creditsName, creditsData]) => {
    return (
      <CreditSection
        key={creditsName}
        creditsData={creditsData}
        routeName={routeName}
        imgData={imgData}
        creditsName={creditsName}
        isSubsection={true}
      />
    );
  });
};

const CreditSections = ({ data, routeName, imgData, isLoading }) => {
  if (isLoading) return <CreditSectionsSkeleton />;

  const dataLength = Object.entries(data).length;

  const credits = Object.entries(data).map(
    ([creditsName, creditsData], index) => {
      const isLastElement = index >= dataLength - 1;
      const separator = !isLastElement && <Separator />;

      if (creditsName !== 'Team') {
        return (
          <Fragment key={creditsName}>
            <CreditSection
              creditsData={creditsData}
              routeName={routeName}
              imgData={imgData}
              creditsName={creditsName}
            />

            {separator}
          </Fragment>
        );
      }

      return (
        <Fragment key={creditsName}>
          <Section>
            <SectionTitle title={creditsName} />

            <Layout>
              <CreditSubsections
                isSubsection={true}
                data={creditsData}
                routeName={routeName}
                imgData={imgData}
              />
            </Layout>
          </Section>

          {separator}
        </Fragment>
      );
    }
  );

  return credits;
};

export default CreditSections;
