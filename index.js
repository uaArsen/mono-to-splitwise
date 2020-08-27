import { getConfig } from './src/config';
import { Mono } from './src/mono';

exports.handler =  async function(event) {
  const config = getConfig();
  const mono = new Mono(config);
  const splitwise = Splitwise(config);
  const transactions = await mono.getTransactions(event);
  return await splitwise.addExpenses(event, transactions);
}