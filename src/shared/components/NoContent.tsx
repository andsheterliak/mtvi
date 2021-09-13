import { Typography } from '@material-ui/core';

export const NoContent = ({ message }: { message: string }) => {
  return <Typography color="textSecondary">{message}</Typography>;
};
