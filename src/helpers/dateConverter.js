
/**
 * Converts dt_txt in api to Date Format D,M,Y
 * @param {Date} dateString - dt_txt value
 * @returns {{date: Date, dateFormat: string}}
 */
export function dateConverter(dateString) {
  let epoch = new Date(0) // The 0 there is the key, which sets the date to the epoch
  epoch.setUTCSeconds(dateString)
  let date = new Date(epoch)
  const [m, d, y] = new Date(date).toDateString().split(' ').splice(1)
  return {
    date,
    dateFormat: `${d} ${m} ${y.slice(-2)}`,
    calDate: function () {
      return this.date.getDate()
    },
  }
}
