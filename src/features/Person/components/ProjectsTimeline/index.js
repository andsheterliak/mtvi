import TimelineContainer from './TimelineContainer';
import TimelineItem from './TimelineItem';

const ProjectsTimeline = ({ data }) => {
  const timelineItems = data.map((item) => {
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

export default ProjectsTimeline;
