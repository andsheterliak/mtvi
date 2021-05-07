import { element } from 'prop-types';

import creditsTypes from '~components/Credits/creditsTypes';

import Layout from '~components/Layout';
import MainContainer from '~components/MainContainer';
import MainContent from '~components/MainContent';
import Spacer from '~components/Spacer';
import CreditsSections from './CreditsSections';

const Credits = ({ credits, header }) => {
  let creditSections;

  if (credits) {
    creditSections = <CreditsSections data={credits} />;
  }

  return (
    <>
      <Spacer />

      <Layout>
        {header}

        <MainContent>
          <MainContainer>
            <Layout>{creditSections}</Layout>
          </MainContainer>
        </MainContent>
      </Layout>
    </>
  );
};

Credits.propTypes = {
  credits: creditsTypes.creditsData,
  header: element.isRequired,
};

export default Credits;
