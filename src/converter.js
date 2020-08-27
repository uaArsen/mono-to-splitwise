class TransactionConverter {
  constructor(config, event) {
    this.userId = config.splitWiseUserId
    this.allowedTransactions = event.allowedTransactions;
  }

  convert(transactions) {
    return transactions
    .filter(t => this.allowedTransactions[t.description] !== undefined)
    .map(t => this.convertTransaction(t, this.allowedTransactions[t.description]));
  }

  convertTransaction(transaction, allowedTransaction) {
    const amount = Math.abs(transaction.amount) / 100;
    return {
      id: transaction.id,
      amount,
      name: transaction.description,
      split: this.calculateSplit(Math.abs(transaction.amount), allowedTransaction),
    };
  }

  calculateSplit(amount, allowedTransaction) {
    const n = allowedTransaction.split.users.length + 1;
    const owed = this.splitMoney(amount, n);
    let i = 0;
    const result = [
      {
        id: this.userId,
        share: amount / 100,
        owed: owed[i],
      }
    ];

    allowedTransaction.split.users.forEach(u => {
      i++;
      result.push({
        id: u.id,
        share: 0,
        owed: owed[i],
      });
    });
    return { users: result };
  }

  splitMoney(amount, n) {
    amount = amount / 100;
    const division = parseFloat((amount / n).toFixed(2));
    const toDistribute = amount - (division * n);

    const parties = [];

    for (let i = 0; i < n; i++) {
      parties[i] = division;
    }

    let j = 0;
    for (let i = toDistribute; i > 0; i--) {
      parties[j] += 0.01;
      j++;
    }
    j = 0;
    for (let i = toDistribute; i < 0; i++) {
      parties[j] -= 0.01;
      j++;
    }
    return parties;
  }
}

exports.TransactionConverter = TransactionConverter;