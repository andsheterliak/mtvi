import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
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
