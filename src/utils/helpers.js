export const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB");
};

export const getScore = (rating) => {
  if (rating === undefined || rating === null) return "-";
  const score = rating > 10 ? rating / 10 : rating;
  return Math.round(score);
};
