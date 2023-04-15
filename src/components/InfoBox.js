import React from 'react';
import clsx from 'clsx';
import { Card, CardContent, Grid, Typography, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  difference: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  differenceValue: {
    color: (props) => (props.positiveDifference ? theme.palette.success.main : theme.palette.error.main),
    marginRight: theme.spacing(1),
  },
}));

const InfoBox = (props) => {
  const { className, title, value, differenceValue, caption, ...rest } = props;
  const positiveDifference = differenceValue && differenceValue.charAt(0) === '+';
  const classes = makeStyles({ positiveDifference, ...props });

  return (
    <Card {...rest} className={clsx(classes.root, className)} elevation={0}>
      <CardHeader title={title} />
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h4">{value}</Typography>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography className={classes.differenceValue} variant="body2">
            {differenceValue}
          </Typography>
          <Typography className={classes.caption} variant="caption">
            {caption}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
