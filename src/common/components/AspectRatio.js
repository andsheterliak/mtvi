import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => {
  return {
    imgWrapper: {
      height: 0,
      position: 'relative',
      borderRadius: 'inherit',
      maxHeight: 'inherit',

      paddingBottom({ aspectRatio }) {
        return theme.aspectRatios[aspectRatio];
      },
    },

    media: {
      '& >:first-child': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        maxHeight: 'inherit',
      },
    },
  };
});

const AspectRatio = ({
  rootClasses = '',
  imgWrapperClasses = '',
  aspectRatio = '2:3',
  children,
}) => {
  const classes = useStyles({ aspectRatio });

  const imgWrapperClassNames = classNames(
    classes.imgWrapper,
    imgWrapperClasses,
    classes.media
  );

  return (
    <div className={rootClasses}>
      <div className={imgWrapperClassNames}>{children}</div>
    </div>
  );
};

export default AspectRatio;
