import { ifIsData } from '~common/utils/getData';
import NoContent from '~components/NoContent';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import SeeAllLink from '~components/SeeAllLink';
import Slider from '~components/Slider';
import VideoCards from '~components/VideoCards';
import VideosGridRow from './VideosGridRow';

const TopVideos = ({ title, data, videosPath, isLoading, videoAmount }) => {
  const content =
    !isLoading && !ifIsData(data) ? (
      <NoContent message="We don't have added any videos." />
    ) : (
      <Slider>
        <VideosGridRow>
          <VideoCards
            isLoading={isLoading}
            data={data}
            videoAmount={videoAmount}
          />
        </VideosGridRow>
      </Slider>
    );

  return (
    <Section>
      <SectionTitle title={title} />

      {content}

      <SeeAllLink path={videosPath}>View All Videos</SeeAllLink>
    </Section>
  );
};

export default TopVideos;
