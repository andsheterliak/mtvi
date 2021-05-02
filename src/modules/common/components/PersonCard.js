import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { string } from 'prop-types';

import { getHyphenOrData } from '~common/utils/getData';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import noUserPhotoImg from '~assets/img/no-user-photo.svg';
import useStyles from '~components/Cards/CardStyles';

const PersonCard = ({ profilePath, name, bodyContent, path }) => {
  const classes = useStyles();

  const profileImg = profilePath
    ? `${IMG_BASE_URL}${IMG_SIZES.profile}${profilePath}`
    : noUserPhotoImg;

  return (
    <Card raised>
      <CardActionArea component={Link} to={path} className={classes.action}>
        <CardMedia component="img" alt={name} image={profileImg} />

        <CardContent className={classes.content}>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body1"
            component="h2"
          >
            {getHyphenOrData(name)}
          </Typography>

          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className={classes.subText}
          >
            {bodyContent}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

PersonCard.propTypes = {
  profilePath: string,
  name: string,
  bodyContent: string,
  path: string.isRequired,
};

export default PersonCard;
