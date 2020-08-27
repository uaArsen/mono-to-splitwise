const axios = require('axios');
const qs = require('querystring')

class Splitwise {

  constructor(config) {
    this.clientId = config.splitWiseKey;
    this.clientSecret = config.splitWiseSecret;
    this.grantType = 'client_credentials';
    this.oauthUrl = 'https://secure.splitwise.com/oauth/token';
    this.url = 'https://secure.splitwise.com/api/v3.0';
    this.token = null;
    this.group = config.splitWiseGroup
  }

  async addExpenses(payments) {
    await this.updateToken();
    const results = [];
    for (const  p of payments) {
      const result = await this.addExpense(p)
      results.push(result)
    }
    return results;
  }

  async addExpense(payment) {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    const cost = payment.amount;
    const description = `${payment.name} ${payment.id}`;
    const pay = false;
    const splitEqually = payment.split.splitEqually;
    const params = {
      group_id: this.group,
      cost,
      description,
      pay,
    };
    if (!splitEqually) {
      const users = payment.split.users
      let i = 0;
      users.forEach( user => {
        params[`users__${i}__user_id`] = user.id;
        params[`users__${i}__paid_share`] = user.share;
        params[`users__${i}__owed_share`] = user.owed;
        i++;
      });
    } else {
      params.split_equally = splitEqually;
    }
    const result = await axios.post(`${this.url}/create_expense`, null, { params, headers });
    if (result.status !== 200 || (Object.keys(result.data.errors).length !== 0)) {
      throw new Error(`SplitWise API returned error ${JSON.stringify(result.data)}`)
    }
    return result.data;
  }

  async updateToken() {
    if (!this.token) {
      const body = {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: this.grantType,
      };
      const result = await axios({
          url: this.oauthUrl,
          method: 'post',
          data: qs.stringify(body),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      this.token = result.data.access_token;
    }
  }

}

exports.Splitwise = Splitwise;