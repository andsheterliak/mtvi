import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
  },

  media: {
    // Standard 500 width images which are used here have 2:3 aspect ratio but some images have a bit different ratio, so to display those properly there is need to standardize all the images to 2:3 aspect ratio using the trick.
    height: 0,
    paddingTop: '150%',
  },

  action: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'stretch',
  },

  content: {
    height: '100%',
    display: 'grid',
    padding: theme.spacing(1.5),
  },

  subText: {
    alignSelf: 'end',
    marginTop: '5px',
  },
}));

export default useStyles;
