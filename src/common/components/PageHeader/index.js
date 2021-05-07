import { ThemeProvider } from '@material-ui/core/styles';

import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { innerDarkTheme } from '~common/theme';
import types from '~common/types';

import MainContainer from '~components/MainContainer';
import InfoList from '~components/InfoList';
import HeaderTitle from '../header/HeaderTitle';
import HeaderDescription from '../header/Description';
import useStyles from './PageHeaderStyles';

const PageHeader = ({ backdrop, title, overview, dataList }) => {
  const classes = useStyles();

  const backdropPath = backdrop
    ? `${IMG_BASE_URL}${IMG_SIZES.backdrop}${backdrop}`
    : null;

  const img = backdropPath ? (
    <img src={backdropPath} alt="" className={classes.img} />
  ) : null;

  const imgBackground = backdropPath ? (
    <img src={backdropPath} alt="" className={classes.imgBackground} />
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

PageHeader.propTypes = {
  backdrop: types.pageHeader.imgPath,
  title: types.pageHeader.headerName,
  overview: types.pageHeader.description,
  dataList: types.dataList,
};

export default PageHeader;
