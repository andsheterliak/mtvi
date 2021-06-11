import { useSelector } from 'react-redux';

import BackToHeader from '~components/BackToHeader';
import MainContent from '~components/MainContent';
import Spacer from '~components/Spacer';
import MainContainer from '~components/MainContainer';
import useTVShows from './hooks/useTVShows';
import noImg from '~assets/img/no-image.svg';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import { getImagePath, ifIsData } from '~common/utils/getData';
import SeasonCards from './components/SeasonCards';
import NoContent from '~components/NoContent';
import { getData } from './tvShowSelectors';

const AllSeasons = () => {
  useScrollToTop();
  useTVShows();

  const data = useSelector(getData);

  let imgPath;
  let seasonsCards;

  if (data) {
    imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.profile,
      path: data.poster_path,
      fallback: noImg,
    });

    seasonsCards = ifIsData(data.seasons) ? (
      <SeasonCards
        data={data.seasons}
        basePath={`/${ROUTE_NAMES.tvShow}/${data.id}/${ROUTE_NAMES.season}`}
        imgData={{
          basePath: IMG_BASE_URL,
          size: IMG_SIZES.profile,
          fallback: noImg,
        }}
      />
    ) : (
      <NoContent message="We don't have added any seasons." />
    );
  }

  return (
    <>
      <Spacer />

      {data ? (
        <MainContent>
          <BackToHeader
            imgPath={imgPath}
            linkName="Back to TV Show"
            title={data.name}
            path={`/${ROUTE_NAMES.tvShow}/${data.id}`}
          />

          <Spacer />

          <MainContainer>{seasonsCards}</MainContainer>
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default AllSeasons;
