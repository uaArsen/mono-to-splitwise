# AWS Lambda: Monobank to SplitWise transfer

## Usage

1. Zip project and deploy to AWS as Lambda function
2. Configure following environment variables:
 * `MONOBANK_TOKEN` - mandatory, security token used for connection to Monobank API
 * `SPLITWISE_KEY` - mandatory, Splitwise Consumer Key used as OAuth2 `client_id` for authentication with Splitwise API
 * `SPLITWISE_SECRET` - mandatory, Splitwise Secret Key used as OAuth2 `client_secret` for authentication with Splitwise API
 * `SPLITWISE_GROUP` - mandatory, Splitwise group id used to transfer configured transactions from Monobank
 * `SPLITWISE_USER` - mandatory, Splitwise user id, user that paid for configured transactions from Monobank
 * `DEBUG` - optional, enables debug output
3. Configure event trigger. Event Body structure: 
```json5
{ 
   "monoAccount" : 0, // Account number in Monobank, if not provided default account will be used",
   "monoFrom" : 1598539328 ,  // Timestamp of start date to look for transactions, if not provided start of current month used
   "monoTo" : 1598539328 ,  // Timestamp of end date to look for transactions, if not provided current date used
   "allowedTransactions":{ // Transaction to be transfered
      "Google Service": { // Transaction name must much `description` field in Monobank Transaction
         "split":{ // How to split transaction
            "splitEqually":true // Will split equally between each member of Splitwise group
         }
      },
      "Netflix":{ // Another transaction
         "split": {
            "splitEqually":false, // Will be split equally, but only between configured users and your user configureed via env: SPLITWISE_USER 
            "users":[ // configuring users
               {
                  "id":"splitwiseId1" // Splitwise user ID 
               },
               {
                  "id":"splitwiseId2" // Splitwise user ID 
               }
            ]
         }
      }
   }
}
```
## Useful links
1. [MonoBank API](https://api.monobank.ua/docs)
2. [Splitwise API](https://dev.splitwise.com/#introduction)