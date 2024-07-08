# Sample Queries

## Query 1: Most Recent Transfers

This query retrieves the five most recent transfers sorted by timestamp in descending order:

```gql
query GetRecentTransfers {
  transfers(orderBy: timestamp, orderDirection: desc, first: 5) {
    id
    from {
      id
    }
    to {
      id
    }
    value
    timestamp
  }
}
```

## Query 2: Account with Highest Total Received and Sent

This query fetches the account with the highest total amount received and sent (totalReceived, totalSent):

```gql
query GetAccountWithHighestSentAndReceived {
  highestReceived: accounts(
    orderBy: totalReceived
    orderDirection: desc
    first: 1
  ) {
    id
    totalReceived
    receivedCount
  }
  highestSent: accounts(orderBy: totalSent, orderDirection: desc, first: 1) {
    id
    totalSent
    sentCount
  }
}
```

## Query 3: Top 7 interactions in transfers (totalSent, totalReceived) and the IDs (accounts involved) for a specific account

This query fetches all transfers involving a specific account, identified by its ID (address):

```gql
query GetTop7Interactions {
  account(id: "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea") {
    id
    totalSent
    totalReceived
    sentCount
    receivedCount
    sentTransfers(orderBy: value, orderDirection: desc, first: 7) {
      to {
        id
      }
      value
      timestamp
    }
    receivedTransfers(orderBy: value, orderDirection: desc, first: 7) {
      from {
        id
      }
      value
      timestamp
    }
  }
}
```

## Query 4

This query retrieves detailed information about the sender accounts for the top 7 transfers received by the specified account, providing a comprehensive view of each sender’s transfer activity and statistics.

```gql
query GetAccountReceivedFrom {
  account(id: "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea") {
    receivedTransfers(orderBy: value, orderDirection: desc, first: 7) {
      from {
        id
        sentTransfers {
          id
          value
          timestamp
        }
        receivedTransfers {
          id
          value
          timestamp
        }
        totalSent
        totalReceived
        sentCount
        receivedCount
      }
      value
      timestamp
    }
  }
}
```

## Query 5

### This query provides a snapshot of the top 5 accounts by lifetime transfers, whether they are sending or receiving tokens

```graphql
query TopAccountsLifetime {
  topSenders: accounts(
    where: { totalSent_not: null }
    orderBy: totalSent
    orderDirection: desc
    first: 5
  ) {
    id
    totalSent
    sentCount
  }
  topReceivers: accounts(
    where: { totalReceived_not: null }
    orderBy: totalReceived
    orderDirection: desc
    first: 5
  ) {
    id
    totalReceived
    receivedCount
  }
}
```
