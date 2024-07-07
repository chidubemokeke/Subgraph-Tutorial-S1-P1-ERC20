# Sample Queries

## This query fetches the account with the highest total amount received and sent (totalReceived, totalSent)

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

## This query fetchs the top 5 accounts that a specific account has transacted with and their values

```gql
query GetTopInteractions {
  account(id: "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea") {
    id
    totalSent
    totalReceived
    sentCount
    receivedCount
    sentTransfers(orderBy: value, orderDirection: desc, first: 5) {
      to {
        id
      }
      value
      timestamp
    }
    receivedTransfers(orderBy: value, orderDirection: desc, first: 5) {
      from {
        id
      }
      value
      timestamp
    }
  }
}
```

### This query provides a snapshot of the top accounts by lifetime transfers, whether they are sending or receiving tokens

```graphql
query TopAccountsLifetime {
  topSenders: accounts(
    where: { totalSent_not: null }
    orderBy: totalSent
    orderDirection: desc
    first: 10
  ) {
    id
    totalSent
    sentCount
  }
  topReceivers: accounts(
    where: { totalReceived_not: null }
    orderBy: totalReceived
    orderDirection: desc
    first: 10
  ) {
    id
    totalReceived
    receivedCount
  }
}
```
