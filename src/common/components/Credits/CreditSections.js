import { Fragment } from 'react';

import { ROUTE_NAMES } from '~common/constants';
import Separator from '~components/Separator';

import Layout from '~components/Layout';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import CreditCard from './CreditCard';
import CreditsGrid from './CreditsGrid';

const CreditCards = ({ data }) => {
  return data.map(({ name, info, id, profilePath }) => {
    return (
      <CreditCard
        key={id}
        profilePath={profilePath}
        name={name}
        info={info}
        path={`${ROUTE_NAMES.person}/${id}`}
      />
    );
  });
};

const CreditSubsections = ({ data }) => {
  return Object.entries(data).map(([creditsName, creditsData]) => {
    return (
      <Section key={creditsName}>
        <SectionTitle isSubtitle title={creditsName} />

        <CreditsGrid>
          <CreditCards data={Object.values(creditsData)} />
        </CreditsGrid>
      </Section>
    );
  });
};

const CreditSections = ({ data }) => {
  const dataLength = Object.entries(data).length;

  const credits = Object.entries(data).map(
    ([creditsName, creditsData], index) => {
      const isLastElement = index >= dataLength - 1;
      const separator = !isLastElement && <Separator />;

      if (creditsName !== 'Team') {
        return (
          <Fragment key={creditsName}>
            <Section>
              <SectionTitle title={creditsName} />

              <CreditsGrid>
                <CreditCards data={creditsData} />
              </CreditsGrid>
            </Section>

            {separator}
          </Fragment>
        );
      }

      return (
        <Fragment key={creditsName}>
          <Section>
            <SectionTitle title={creditsName} />

            <Layout>
              <CreditSubsections data={creditsData} />
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
