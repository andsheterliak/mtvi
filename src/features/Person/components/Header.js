import { makeStyles } from '@material-ui/core/styles';

import { getImagePath } from '~common/utils/getData';
import HeaderDescription from '~components/header/Description';
import HeaderTitle from '~components/header/HeaderTitle';
import InfoList from '~components/InfoList';
import SocialLinks from './SocialLinks';

const useStyles = makeStyles((theme) => {
  return {
    img: {
      width: '100%',
      maxWidth: '250px',
      display: 'inline-block',
      borderRadius: '5px',

      [theme.breakpoints.up('sm')]: {
        maxWidth: '350px',
      },
    },

    infoBlock: {
      display: 'flex',
      flexDirection: 'column',

      '& > :first-child': {
        alignSelf: 'center',

        [theme.breakpoints.up('md')]: {
          marginRight: '36px',
          alignSelf: 'start',
        },
      },

      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
    },
  };
});

const Header = ({ dataList, name, biography, imgData, externalIds }) => {
  const classes = useStyles();

  const imgPath = getImagePath(imgData);

  return (
    <section className={classes.infoBlock}>
      <img className={classes.img} alt={name} src={imgPath} />

      <div>
        {name && <HeaderTitle title={name} />}

        {biography && <HeaderDescription description={biography} />}

        <InfoList dataList={dataList} />

        <SocialLinks externalIds={externalIds} />
      </div>
    </section>
  );
};

export default Header;
