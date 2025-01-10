export const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()} ${hours}:${minutes}`;
};
