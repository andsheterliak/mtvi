import { Typography } from '@material-ui/core';

type Props = {
  id?: string;
  children: string;
};

export const OptionTitle = ({ id = '', children }: Props) => {
  return (
    <Typography gutterBottom color="textSecondary" variant="body2" component="h3" id={id}>
      {children}
    </Typography>
  );
};
