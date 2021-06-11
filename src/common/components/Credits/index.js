import { ifIsData } from '~common/utils/getData';
import Layout from '~components/Layout';
import MainContainer from '~components/MainContainer';
import MainContent from '~components/MainContent';
import NoContent from '~components/NoContent';
import Spacer from '~components/Spacer';
import CreditSections from './CreditSections';

const Credits = ({ credits, header, imgData, routeName }) => {
  const content = ifIsData(credits) ? (
    <CreditSections
      data={credits}
      imgData={imgData}
      routeName={(imgData, routeName)}
    />
  ) : (
    <NoContent message="We don't have added any credits." />
  );

  return (
    <>
      <Spacer />

      <Layout>
        {header}

        <MainContent>
          <MainContainer>
            <Layout>{content}</Layout>
          </MainContainer>
        </MainContent>
      </Layout>
    </>
  );
};

export default Credits;
