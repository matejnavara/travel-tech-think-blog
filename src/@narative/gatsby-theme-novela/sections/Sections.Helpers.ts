import moment from "moment";

export const articleInFuture = date => {
  const articleDate = moment(date, "MMMM Do, YYYY");
  return moment().isBefore(articleDate);
};
