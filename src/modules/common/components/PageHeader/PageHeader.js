import { ThemeProvider } from '@material-ui/core/styles';

import PageContainer from '../PageContainer';
import InfoList from '../InfoList';
import HeaderTitle from './HeaderTitle';
import HeaderDescription from './HeaderDescription';

import { IMG_BASE_URL, IMG_SIZES } from '../../tmdb-config';
import useStyles from './PageHeaderStyles';
import { innerDarkTheme } from '../../../App/theme';

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

        <PageContainer>
          <div className={classes.infoBlock}>
            <div className={classes.imgBackgroundWrapper}>{imgBackground}</div>

            <div className={classes.infoBlockInner}>
              {title && <HeaderTitle title={title} />}

              {overview && <HeaderDescription description={overview} />}

              <InfoList dataList={dataList} />
            </div>
          </div>
        </PageContainer>
      </section>
    </ThemeProvider>
  );
};

export default PageHeader;
