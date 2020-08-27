exports.getConfig = () => ({
  monoToken: process.env.MONOBANK_TOKEN,
  splitWiseKey: process.env.SPLITWISE_KEY,
  splitWiseSecret: process.env.SPLITWISE_SECRET,
  splitWiseGroup: process.env.SPLITWISE_GROUP,
  splitWiseUserId: process.env.SPLITWISE_USER,
});