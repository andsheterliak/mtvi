import { useSelector } from 'react-redux';

import { formatDataStr, formatMinutes } from '~common/utils/date';
import {
  checkIfIsData,
  getCertification,
  getGenres,
} from '~common/utils/getData';
import Certification from '~components/PageHeader/Certification';
import Creators from '~components/PageHeader/Creators';
import PageHeader from '~components/PageHeader/PageHeader';

const getDirectors = (crew) => {
  if (!checkIfIsData(crew)) return null;

  const directors = [];

  crew.forEach(({ job, name, id }) => {
    if (job === 'Director') directors.push({ name, id });
  });

  return directors;
};

const generateDataList = (data) => {
  let certification = getCertification(data.release_dates?.results);

  certification = certification && (
    <Certification certification={certification} />
  );

  let directors = getDirectors(data.credits?.crew);

  directors = directors && <Creators creators={directors} />;

  const releaseDate = formatDataStr(data.release_date)?.dateStr;
  const genres = getGenres(data.genres);
  const time = formatMinutes(data.runtime);

  const dataList = [
    { name: 'Certification', value: certification },
    { name: 'Rating', value: data.vote_average },
    { name: 'Genres', value: genres },
    { name: 'Release date', value: releaseDate },
    { name: 'Status', value: data.status },
    { name: 'Time', value: time },
    { name: 'Directors', value: directors },
  ];

  return dataList;
};

const MovieHeader = () => {
  const { data } = useSelector((state) => state.movie);

  const dataList = generateDataList(data);

  return (
    <PageHeader
      backdrop={data.backdrop_path}
      overview={data.overview}
      title={data.title}
      dataList={dataList}
    ></PageHeader>
  );
};

export default MovieHeader;
