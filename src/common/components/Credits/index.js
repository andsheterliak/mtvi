import { ifIsData } from '~common/utils/getData';
import Layout from '~components/Layout';
import MainContainer from '~components/MainContainer';
import MainContent from '~components/MainContent';
import NoContent from '~components/NoContent';
import Spacer from '~components/Spacer';
import CreditSections from './CreditSections';

const Credits = ({ credits, header, imgData, routeName, isLoading }) => {
  const content =
    !isLoading && !ifIsData(credits) ? (
      <NoContent message="We don't have added any credits." />
    ) : (
      <CreditSections
        isLoading={isLoading}
        data={credits}
        imgData={imgData}
        routeName={(imgData, routeName)}
      />
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
