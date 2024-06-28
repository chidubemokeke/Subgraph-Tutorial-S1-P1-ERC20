# This query retrieves all transfers made by the first 10 addresses in the accounts entity

## Fetch the first 10 accounts sent transfer history

```gql
  accounts(first: 10) {
    # For each account, get the account ID
    id
    # For each account, get all sent transfers
    sentTransfers {
      # Get the unique ID of the transfer
      id
      # Get the recipient account of the transfer
      to {
        id
      }
      # Get the value of the transfer
      value
      # Get the timestamp of the transfer
      timestamp
    }
  }
```

## Get Top 10 Highest Transactions

```gql
# This query retrieves the top 10 highest transactions by value
query GetTop10HighestTransactions {
  # Fetch the transfers, ordered by value in descending order, limiting to the first 10 results
  transfers(orderBy: value, orderDirection: desc, first: 10) {
    # Get the unique ID of the transfer
    id
    # Get the sender account of the transfer
    from {
      id
    }
    # Get the recipient account of the transfer
    to {
      id
    }
    # Get the value of the transfer
    value
    # Get the timestamp of the transfer
    timestamp
    # For this example, include startTime and endTime for demonstration
    # Both fields are set to the timestamp of the transfer, typically used to indicate a range
    startTime: timestamp
    endTime: timestamp
  }
}
```

## Get User with the Highest Transactions

```gql
# This query retrieves the transaction with the highest value
query GetPersonWithHighestTransaction {
  # Fetch the transfers, ordered by value in descending order, limiting to the highest value transaction
  transfers(orderBy: value, orderDirection: desc, first: 1) {
    # Get the unique ID of the transfer
    id
    # Get the sender account of the transfer
    from {
      id
    }
    # Get the recipient account of the transfer
    to {
      id
    }
    # Get the value of the transfer
    value
    # Get the timestamp of the transfer
    timestamp
  }
}
```
