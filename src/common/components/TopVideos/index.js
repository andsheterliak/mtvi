import types from '~common/types';
import { getTopItems } from '~common/utils/getData';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import SeeAllLink from '~components/SeeAllLink';
import Slider from '~components/Slider';
import VideoCards from '~components/VideoCards';
import VideosGridRow from './VideosGridRow';

const TopVideos = ({ title, data, videosPath }) => {
  return (
    <Section>
      <SectionTitle title={title} />

      <Slider>
        <VideosGridRow>
          <VideoCards data={getTopItems(data, 6)} />
        </VideosGridRow>
      </Slider>

      <SeeAllLink path={videosPath}>View All Videos</SeeAllLink>
    </Section>
  );
};

TopVideos.propTypes = {
  title: types.generic.title.isRequired,
  data: types.specific.cardsData,
  videosPath: types.generic.path.isRequired,
};

export default TopVideos;
