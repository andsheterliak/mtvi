import { NoContent } from '~/shared/components/NoContent';
import { Section, SectionTitle } from '~/shared/components/section';
import { SeeAllLink } from '~/shared/components/SeeAllLink';
import { Slider } from '~/shared/components/Slider';
import { VideoCards } from '~/shared/components/VideoCards';
import { ifIsData } from '~/shared/utils';
import { VideosGridRow } from './VideosGridRow';

export const TopVideos = ({
  title,
  data,
  videosPath,
  isLoading,
  videoAmount,
}) => {
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
