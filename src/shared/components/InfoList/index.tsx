import { IsLoading } from '~/shared/types';
import { InfoItem } from './InfoItem';
import { InfoListContainer } from './InfoListContainer';
import { DataList } from './types';

type Props = {
  dataList: DataList;
  isLoading: IsLoading;
  itemSkeletonAmount?: number;
};

export const InfoList = ({ dataList, isLoading, itemSkeletonAmount = 5 }: Props) => {
  const items = isLoading
    ? Array(itemSkeletonAmount)
        .fill('')
        .map((_, index) => {
          return <InfoItem key={index} isLoading={true} />;
        })
    : dataList?.map(({ name, value }) => {
        return <InfoItem key={name} name={name} value={value} />;
      });

  return <InfoListContainer>{items}</InfoListContainer>;
};

export * from './types';
