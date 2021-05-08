import types from '~common/types';

import InfoItem from './InfoItem';
import InfoListContainer from './InfoListContainer';

const InfoList = ({ dataList }) => {
  const items = dataList.map(({ name, value }) => {
    return <InfoItem key={name} name={name} value={value} />;
  });

  return <InfoListContainer>{items}</InfoListContainer>;
};

InfoList.propTypes = {
  dataList: types.specific.dataList,
};

export default InfoList;
