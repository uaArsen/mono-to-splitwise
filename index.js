const { Mono } = require('./src/mono');
const { Splitwise } = require('./src/splitwise');
const { TransactionConverter } = require('./src/converter');
const { getConfig } = require('./src/config');

const DEBUG = process.env.DEBUG || false

exports.handler = async function (event) {
  try {
    console.info('Start adding new expenses to SplitWise from MonoBank')
    logIfDebugEnabled('Event: %j', event)
    const config = getConfig();
    const mono = new Mono(config);
    const splitwise = new Splitwise(config);
    const converter = new TransactionConverter(config, event);
    const transactions = await mono.getTransactions(event);
    logIfDebugEnabled('Monobank transactions: %j', transactions);
    const payments = converter.convert(transactions);
    logIfDebugEnabled('Converted transactions: %j', payments);
    const results = await splitwise.addExpenses(payments);
    console.info('Finish adding new expenses to SplitWise from MonoBank');
    logIfDebugEnabled('Result of adding expense: %j', results)
    return results;
  }
  catch (e) {
    console.error(e);
    throw e;
  }
};

function logIfDebugEnabled(msg, args) {
  if (DEBUG) {
    console.debug(msg, args)
  }
}