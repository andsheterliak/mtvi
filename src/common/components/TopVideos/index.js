import { ifIsData, getTopItems } from '~common/utils/getData';
import NoContent from '~components/NoContent';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import SeeAllLink from '~components/SeeAllLink';
import Slider from '~components/Slider';
import VideoCards from '~components/VideoCards';
import VideosGridRow from './VideosGridRow';

const TopVideos = ({ title, data, videosPath }) => {
  const isData = ifIsData(data);

  const content = isData ? (
    <Slider>
      <VideosGridRow>
        <VideoCards data={getTopItems(data, 6)} />
      </VideosGridRow>
    </Slider>
  ) : (
    <NoContent message="We don't have added any videos." />
  );

  return (
    <Section>
      <SectionTitle title={title} />

      {content}

      {isData && <SeeAllLink path={videosPath}>View All Videos</SeeAllLink>}
    </Section>
  );
};

export default TopVideos;
