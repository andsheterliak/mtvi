import BackToHeader from '~components/BackToHeader';
import MainContent from '~components/MainContent';
import Spacer from '~components/Spacer';
import MainContainer from '~components/MainContainer';
import useTVShowsState from './hooks/useTVShowsState';
import noImg from '~assets/img/no-image.svg';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import { checkIfIsData } from '~common/utils/getData';
import SeasonCards from './components/SeasonCards';
import NoContent from '~components/NoContent';

const AllSeasons = () => {
  useScrollToTop();

  const { data } = useTVShowsState();

  let imgPath;
  let seasons;

  if (data) {
    imgPath = data.poster_path
      ? `${IMG_BASE_URL}${IMG_SIZES.profile}${data.poster_path}`
      : noImg;

    seasons = checkIfIsData(data.seasons) ? (
      <SeasonCards
        data={data.seasons}
        basePath={`${ROUTE_NAMES.tvShow}/${data.id}/${ROUTE_NAMES.season}`}
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
            path={`${ROUTE_NAMES.tvShow}/${data.id}`}
          />

          <Spacer />

          <MainContainer>{seasons}</MainContainer>
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default AllSeasons;
