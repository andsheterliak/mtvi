import { arrayOf, exact, number, objectOf, shape, string } from 'prop-types';
import types from '~common/types';
import projectsTimelineTypes from './projectsTimelineTypes';
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

ProjectsTimeline.propTypes = {
  data: arrayOf(
    shape({
      dateStr: string,
      id: number.isRequired,
      name: projectsTimelineTypes.name,
      path: projectsTimelineTypes.path,
      year: projectsTimelineTypes.year,
      employment: objectOf(exact(types.specific.dataListItem)).isRequired,
    })
  ),
};

export default ProjectsTimeline;
