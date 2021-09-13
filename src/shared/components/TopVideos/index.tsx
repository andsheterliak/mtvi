import { Videos } from '~/api/tmdb';
import { NoContent } from '~/shared/components/NoContent';
import { Section, SectionTitle } from '~/shared/components/section';
import { SeeAllLink } from '~/shared/components/SeeAllLink';
import { Slider } from '~/shared/components/Slider';
import { VideoCards } from '~/shared/components/VideoCards';
import { ItemAmount } from '~/shared/constants';
import { IsLoading, Path } from '~/shared/types';
import { VideosGridRow } from './VideosGridRow';

type Props = {
  isLoading: IsLoading;
  title: string;
  videoAmount: ItemAmount;
  videosPath: Path;
  data: Videos | undefined;
};

export const TopVideos = ({ title, data, videosPath, isLoading, videoAmount }: Props) => {
  const content =
    !isLoading && (!data || data.length === 0) ? (
      <NoContent message="We don't have added any videos." />
    ) : (
      <Slider isLoading={isLoading}>
        <VideosGridRow>
          <VideoCards isLoading={isLoading} data={data} videoAmount={videoAmount} />
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
