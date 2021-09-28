import { RovingTabIndexProvider } from 'react-roving-tabindex';
import { IsLoading } from '~/shared/types';
import { TimelineItems } from '../types';
import { TimelineContainer } from './TimelineContainer';
import { TimelineItem } from './TimelineItem';

type Props = {
  isLoading: IsLoading;
  data: TimelineItems | null;
};

export const ProjectsTimeline = ({ data, isLoading }: Props) => {
  const timelineItems = isLoading
    ? Array(20)
        .fill('')
        .map((_, index) => {
          return <TimelineItem key={index} isLoading={true} />;
        })
    : data!.map((item) => {
        const infoListData = Object.values(item.employment);

        return (
          <TimelineItem
            key={item.id}
            name={item.name}
            year={item.year}
            path={`${item.path}/${item.id}`}
            infoListData={infoListData}
          />
        );
      });

  return (
    <TimelineContainer>
      {isLoading ? (
        timelineItems
      ) : (
        <RovingTabIndexProvider options={{ loopAround: true, direction: 'vertical' }}>
          {timelineItems}
        </RovingTabIndexProvider>
      )}
    </TimelineContainer>
  );
};
