import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

import useStyles from '../../common/components/Cards/CardStyles';

const PersonCard = ({ profilePath, name, knownFor }) => {
  const classes = useStyles();

  const knownForTitles = knownFor
    .map((item) => item.original_name || item.title)
    .join(', ');

  return (
    <Card raised className={classes.card}>
      <CardActionArea className={classes.action}>
        <CardMedia
          component="img"
          alt={name}
          image={profilePath}
          title={name}
        />

        <CardContent className={classes.content}>
          <Typography gutterBottom variant="body1" component="h2">
            {name}
          </Typography>

          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            className={classes.subText}
          >
            {knownForTitles}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PersonCard;
