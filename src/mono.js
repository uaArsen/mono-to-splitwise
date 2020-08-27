const axios = require('axios');

class Mono {
  constructor(config) {
    this.token = config.monoToken;
    this.url = 'https://api.monobank.ua/'
  }

  async getTransactions(event) {
    const account = event.monoAccount || 0;
    const from = event.monoFrom || this.getStartOfTheMonthTimestamp();
    const to = event.monoTo || this.getCurrentTimestamp();

    const transaction = await axios({
      method: 'get',
      url: this.url + `personal/statement/${account}/${from}/${to}`,
      headers: {
        'X-Token': this.token
      }
    });
    return transaction.data;
  }

  getStartOfTheMonthTimestamp() {
    const current = new Date();
    const date = new Date(current.getFullYear(), current.getMonth(), 1);
    return date.getTime();
  }

  getCurrentTimestamp() {
    const date = new Date();
    return date.getTime();
  }
}

exports.Mono = Mono;