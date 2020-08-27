const { handler } = require('../index')
const { expect } = require('chai');
require('dotenv').config();

describe('Index spec', () => {

  it('Transfer configured transactions', async () => {
    const transaction = process.env.TEST_TRANSACTION;
    const event = {
        allowedTransactions: {}
    };
    event.allowedTransactions[transaction] = {
      split: {
        splitEqually: false,
        users:
          [
            { id: process.env.TEST_USER, },
          ]
      }
    };
    const result = await handler(event);
    expect(result.length).to.be.eql(1);
    expect(result[0].errors).to.be.empty;
  });
})
;