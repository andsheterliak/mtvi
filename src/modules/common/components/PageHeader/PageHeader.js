import { Typography } from '@material-ui/core';

import PageContainer from '../PageContainer';
import InfoList from './InfoList';

import { IMG_BASE_URL, IMG_SIZES } from '../../tmdb-config';
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
    <section>
      {img}

      <PageContainer>
        <div className={classes.infoBlock}>
          {imgBackground}

          <div className={classes.infoBlockInner}>
            <Typography component="h1" className={classes.title}>
              {title}
            </Typography>

            <Typography
              component="p"
              variant="body1"
              className={classes.overview}
            >
              {overview}
            </Typography>

            <InfoList dataList={dataList} />
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default PageHeader;
