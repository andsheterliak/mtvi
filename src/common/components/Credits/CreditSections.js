import { Fragment } from 'react';

import { getImagePath } from '~common/utils/getData';
import Separator from '~components/Separator';

import Layout from '~components/Layout';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import CreditCard from './CreditCard';
import CreditsGrid from './CreditsGrid';

const CreditCards = ({ data, routeName, imgData }) => {
  return data.map(({ name, info, id, profilePath }) => {
    const imgPath = getImagePath({ ...imgData, path: profilePath });

    return (
      <CreditCard
        key={id}
        imgPath={imgPath}
        name={name}
        info={info}
        path={`/${routeName}/${id}`}
      />
    );
  });
};

const CreditSubsections = ({ data, routeName, imgData }) => {
  return Object.entries(data).map(([creditsName, creditsData]) => {
    return (
      <Section key={creditsName}>
        <SectionTitle isSubtitle title={creditsName} />

        <CreditsGrid>
          <CreditCards
            data={Object.values(creditsData)}
            routeName={routeName}
            imgData={imgData}
          />
        </CreditsGrid>
      </Section>
    );
  });
};

const CreditSections = ({ data, routeName, imgData }) => {
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
                <CreditCards
                  data={creditsData}
                  routeName={routeName}
                  imgData={imgData}
                />
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
              <CreditSubsections
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
