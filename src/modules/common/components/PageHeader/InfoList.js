import { makeStyles } from '@material-ui/core/styles';

import InfoItem from './InfoItem';

const useStyles = makeStyles(() => {
  return {
    list: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
  };
});

const InfoList = ({ dataList }) => {
  const classes = useStyles();

  const items = dataList.map(({ name, value }) => {
    return <InfoItem key={name} name={name} value={value} />;
  });

  return <ul className={classes.list}>{items}</ul>;
};

export default InfoList;
