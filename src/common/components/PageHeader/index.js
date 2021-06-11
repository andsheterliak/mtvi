import { getImagePath } from '~common/utils/getData';

import InfoList from '~components/InfoList';
import HeaderTitle from '../header/HeaderTitle';
import HeaderDescription from '../header/Description';
import useStyles from './PageHeaderStyles';

const PageHeader = ({ title, overview, dataList, imgData }) => {
  const classes = useStyles();

  const imgPath = getImagePath(imgData);

  const img = imgPath ? (
    <img src={imgPath} alt="" className={classes.img} />
  ) : null;

  return (
    <div>
      {img}

      <div className={classes.infoBlock}>
        {title && <HeaderTitle title={title} />}

        {overview && <HeaderDescription description={overview} />}

        <InfoList dataList={dataList} />
      </div>
    </div>
  );
};

export default PageHeader;
