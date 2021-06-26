import InfoItem from './InfoItem';
import InfoListContainer from './InfoListContainer';

const InfoList = ({ dataList, isLoading, itemSkeletonAmount = 5 }) => {
  const items = isLoading
    ? Array(itemSkeletonAmount)
        .fill()
        .map((_, index) => {
          return <InfoItem key={index} isLoading={true} />;
        })
    : dataList.map(({ name, value }) => {
        return <InfoItem key={name} name={name} value={value} />;
      });

  return <InfoListContainer>{items}</InfoListContainer>;
};

export default InfoList;
