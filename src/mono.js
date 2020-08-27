const axios = require('axios');

export class Mono {
  constructor(config) {
    this.token = config.monoToken;
    this.url = 'https://api.monobank.ua/'
  }

  async getTransactions(event) {
    const account = event.monoAccount || 0;
    const from = event.monoFrom || 0;
    const to = event.monoTo || 0;
    const transaction = await axios.get(url + `personal/statement/${account}/${from}/${to}`)
  }
}