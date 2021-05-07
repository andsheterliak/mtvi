import { object, objectOf } from 'prop-types';

import { ROUTE_NAMES } from '~common/constants';
import types from '~common/types';
import creditsTypes from '~components/Credits/creditsTypes';

import Layout from '~components/Layout';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import CreditCard from './CreditCard';
import CreditsGrid from './CreditsGrid';

const CreditsCards = ({ data }) => {
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

const CreditsSubsections = ({ data }) => {
  return Object.entries(data).map(([creditsName, creditsData]) => {
    return (
      <Section key={creditsName}>
        <SectionTitle isSubsection title={creditsName} />

        <CreditsGrid>
          <CreditsCards data={Object.values(creditsData)} />
        </CreditsGrid>
      </Section>
    );
  });
};

const CreditsSections = ({ data }) => {
  const credits = Object.entries(data).map(([creditsName, creditsData]) => {
    if (creditsName !== 'Team') {
      return (
        <Section key={creditsName}>
          <SectionTitle title={creditsName} />

          <CreditsGrid>
            <CreditsCards data={creditsData} />
          </CreditsGrid>
        </Section>
      );
    }

    return (
      <Section key={creditsName}>
        <SectionTitle title={creditsName} />

        <Layout>
          <CreditsSubsections data={creditsData} />
        </Layout>
      </Section>
    );
  });

  return credits;
};

CreditsCards.propTypes = {
  data: types.cardsData,
};

CreditsSubsections.propTypes = {
  data: objectOf(object).isRequired,
};

CreditsSections.propTypes = {
  data: creditsTypes.creditsData,
};

export default CreditsSections;
