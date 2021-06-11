import { ThemeProvider } from '@material-ui/core/styles';

import { innerDarkTheme } from '~common/theme';
import { getImagePath } from '~common/utils/getData';

import MainContainer from '~components/MainContainer';
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

  const imgBackground = imgPath ? (
    <img src={imgPath} alt="" className={classes.imgBackground} />
  ) : null;

  return (
    <ThemeProvider theme={innerDarkTheme}>
      <section className={classes.section}>
        {img}

        <MainContainer>
          <div className={classes.infoBlock}>
            <div className={classes.imgBackgroundWrapper}>{imgBackground}</div>

            <div className={classes.infoBlockInner}>
              {title && <HeaderTitle title={title} />}

              {overview && <HeaderDescription description={overview} />}

              <InfoList dataList={dataList} />
            </div>
          </div>
        </MainContainer>
      </section>
    </ThemeProvider>
  );
};

export default PageHeader;
