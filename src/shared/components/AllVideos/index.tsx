import { Videos, VideoTypeKeys, VIDEO_TYPES } from '~/api/tmdb';
import { PageGrid } from '~/shared/components/grids';
import { Layout } from '~/shared/components/Layout';
import { MainContainer } from '~/shared/components/MainContainer';
import { MainContent } from '~/shared/components/MainContent';
import { NoContent } from '~/shared/components/NoContent';
import {
  Selected,
  SelectHandler,
  SelectionBar,
  SelectionBarItem,
} from '~/shared/components/SelectionBar';
import { Spacer } from '~/shared/components/Spacer';
import { VideoCards } from '~/shared/components/VideoCards';
import { ItemAmount } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { VideosGrid } from './VideosGrid';

type VideosDataItem = SelectionBarItem<Videos>;
type VideosData = Record<typeof VIDEO_TYPES[VideoTypeKeys]['key'], VideosDataItem>;

const getVideosData = (videos: Videos | undefined) => {
  if (!videos) return null;

  const videosData: VideosData = {};

  Object.values(VIDEO_TYPES).forEach(({ key, name }) => {
    if (key === VIDEO_TYPES.openingCredits.key) return;
    videosData[key] = { name, amount: 0, data: [] };
  });

  videos.forEach((video) => {
    if (video.site !== 'YouTube') return;

    if (video.type === VIDEO_TYPES.openingCredits.key) {
      videosData[video.type] = { name: video.type, amount: 0, data: [] };
    }

    videosData[video.type].amount += 1;
    videosData[video.type].data.push(video);
  });

  return videosData;
};

type Props = {
  isLoading: IsLoading;
  videoAmount: ItemAmount;
  header: JSX.Element;
  selected: Selected;
  selectHandler: SelectHandler;
  data: Videos | undefined;
};

export const AllVideos = ({
  data,
  header,
  selectHandler,
  selected,
  isLoading,
  videoAmount,
}: Props) => {
  const videosData = getVideosData(data);
  const selectedItem = videosData?.[selected];

  const videos =
    !isLoading && selectedItem?.data.length === 0 ? (
      <NoContent message={`We don't have added any ${selectedItem.name.toLowerCase()}.`} />
    ) : (
      <VideosGrid>
        <VideoCards videoAmount={videoAmount} isLoading={isLoading} data={selectedItem?.data} />
      </VideosGrid>
    );

  return (
    <>
      <Spacer />

      <Layout>
        {header}

        <MainContent>
          <MainContainer>
            <PageGrid>
              <SelectionBar
                isLoading={isLoading}
                title="Videos"
                data={videosData}
                selectHandler={selectHandler}
                selected={selected}
                itemSkeletonAmount={7}
              />

              {videos}
            </PageGrid>
          </MainContainer>
        </MainContent>
      </Layout>
    </>
  );
};
