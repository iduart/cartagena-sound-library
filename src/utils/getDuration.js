import moment from 'moment';

const getDuration = (from, to) => {
  const TIME_FORMAT = 'hh:mm:ss.SS';
  const fromTime = moment(from, TIME_FORMAT);
  const toTime = moment(to, TIME_FORMAT);
  
  const diff = toTime.diff(fromTime);

  const duration = moment.duration(diff);

  return duration.asSeconds();
}

export default getDuration;