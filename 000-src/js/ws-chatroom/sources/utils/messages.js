const moment = require('moment');

function formatMessage(pseudo, text) {
  return {
    pseudo,
    text,
    time: moment().format('h:mm a')
  }
}

module.exports = {
  formatMessage
};
