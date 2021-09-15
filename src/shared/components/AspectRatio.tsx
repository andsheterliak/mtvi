import { makeStyles, createStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { AspectRatiosKeys } from '~/shared/theme';

const useStyles = makeStyles(({ aspectRatios }) => {
  return createStyles({
    imgWrapper: {
      height: 0,
      position: 'relative',
      borderRadius: 'inherit',
      maxHeight: 'inherit',

      paddingBottom({ aspectRatio }: { aspectRatio: AspectRatiosKeys }) {
        return aspectRatios[aspectRatio];
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
        objectFit: 'cover',
      },
    },
  });
});

type Props = {
  children: ReactNode;
  rootClasses?: string;
  imgWrapperClasses?: string;
  aspectRatio?: AspectRatiosKeys;
};

export const AspectRatio = ({
  rootClasses = '',
  imgWrapperClasses = '',
  aspectRatio = '2:3',
  children,
}: Props) => {
  const classes = useStyles({ aspectRatio });

  const imgWrapperClassNames = classNames(classes.imgWrapper, imgWrapperClasses, classes.media);

  return (
    <div className={rootClasses}>
      <div className={imgWrapperClassNames}>{children}</div>
    </div>
  );
};
