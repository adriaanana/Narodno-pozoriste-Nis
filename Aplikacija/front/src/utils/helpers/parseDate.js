function parseDate(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toISOString().split('T')[0];
  const time = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const day = dateTime.getDate().toString().padStart(2, '0');

  return [`${day} - ${month}`, time];
}
export default parseDate;
