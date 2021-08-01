import { TimelineContainer } from './TimelineContainer';
import { TimelineItem } from './TimelineItem';

export const ProjectsTimeline = ({ data, isLoading }) => {
  const timelineItems = isLoading
    ? Array(20)
        .fill()
        .map((_, index) => {
          return <TimelineItem key={index} isLoading={true} />;
        })
    : data.map((item) => {
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

  return <TimelineContainer>{timelineItems}</TimelineContainer>;
};
