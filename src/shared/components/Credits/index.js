import { ifIsData } from '~/shared/utils';
import { Layout } from '~/shared/components/Layout';
import { MainContainer } from '~/shared/components/MainContainer';
import { MainContent } from '~/shared/components/MainContent';
import { NoContent } from '~/shared/components/NoContent';
import { Spacer } from '~/shared/components/Spacer';
import { CreditSections } from './CreditSections';

export const Credits = ({ credits, header, imgData, routeName, isLoading }) => {
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
