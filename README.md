# Subgraph Development Masterclass - S1

Welcome to the Beginner Level of the Subgraph Development Masterclass. This tutorial will guide you through the fundamentals of subgraph development using The Graph Studio, from setting up your environment to deploying your first subgraph.

## Overview

In this masterclass, you'll gain essential skills in subgraph development, enabling you to efficiently index and query blockchain data for your decentralized application(dApps).

## Learning Objectives

By completing this masterclass, you will:

- Understand the purpose and benefits of subgraphs in dApps.
- Learn how to set up your development environment for subgraph development.
- Define GraphQL entities to model data structures for indexing smart contract events.
- Implement mappings logic to transform blockchain events to entities in your subgraph.
- Deploy your subgraph using The Graph Studio for querying.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Graph CLI](https://github.com/graphprotocol/graph-cli)
- [The Graph Studio Account](https://thegraph.com/studio/)

## Step-by-Step Tutorial

### Step 1: Using The Graph Studio

**Create a New Subgraph in The Graph Studio:**

- Navigate to The Graph Studio, sign in, and create a new subgraph.
- Enter the required details such as the subgraph name and description.
- you will receive a deploy key and subgraph slug (e.g., username/subgraph-name)
- Initialize your subgraph with the commmand from the studio.

```bash
graph init --studio <subgraph-name>
```

**Authenticate with The Graph Studio:**

- Copy the deploy key from The Graph Studio
- Run the following command in your terminal to authenticate:

```bash
graph auth --studio <ACCESS_TOKEN>
```

### Step 2: Understanding the Project Structure

The initialized project contains the following structure:

- **subgraph.yaml**: Defines the subgraph manifest.
- **schema.graphql**: Contains the GraphQL schema.
- **src/**: Contains the source files.
  - **mappings/**: Contains the mapping functions.
    - **uniswap.ts**: Handles the mappings for the Uniswap contract.
  - **utils/**: Contains utility files.
    - **helper.ts**: Contains helper functions.
- **abis/**: Contains the contract ABI files.
  - **Uniswap.json**: ABI for the Uniwsap contract.
- **generated/**: Contains auto-generated files.
  - **schema.ts**: Type definitions generated from the GraphQL schema.

### Step 3: Defining GraphQL Entities

In subgraph development, GraphQL entities define the data structures that your subgraph will index from Ethereum smart contracts. Let's break down the entities defined in schema.graphql:

```gql
type Transfer @entity(immutable: true) {
  id: ID!
  from: Account!
  to: Account!
  value: BigInt!
  timestamp: BigInt!
}

type Account @entity {
  id: ID!
  sentTransfers: [Transfer!]! @derivedFrom(field: "from")
  receivedTransfers: [Transfer!]! @derivedFrom(field: "to")
  totalSent: BigInt!
  totalReceived: BigInt!
  sentCount: Int!
  receivedCount: Int!
}
```

#### Transfer Entity

- Purpose: The Transfer entity represents a transfer event on the Ethereum blockchain.
- Fields:
  - id: A unique identifier for each transfer event, combining the transaction hash and log index.
    - from: A reference to the Account entity representing the sender.
    - to: A reference to the Account entity representing the receiver.
    - value: The amount transferred, represented as a BigInt.
    - timestamp: The block timestamp when the transfer occurred, represented as a BigInt.
    - @entity(immutable: true): This directive ensures that the entity's fields cannot be modified once created, reflecting the immutable nature of blockchain data.

#### Account Entity

- Purpose: The Account entity represents an Ethereum account involved in transfers.
- Fields:
  - id: A unique identifier for each account, usually the account address.
  - sentTransfers: A list of Transfer entities where this account is the sender.
  - receivedTransfers: A list of Transfer entities where this account is the receiver.
  - totalSent: The total amount sent by this account, represented as a BigInt.
  - totalReceived: The total amount received by this account, represented as a BigInt.
  - sentCount: The number of transfers sent by this account.
    -receivedCount: The number of transfers received by this account.
- Derived Fields:
  - @derivedFrom(field: "from"): This directive indicates that the sentTransfers field should be populated based on the from field of the Transfer entity.
  - @derivedFrom(field: "to"): This directive indicates that the receivedTransfers field should be populated based on the to field of the Transfer entity.

### Step 4: Helper Functions

In src/utils/helper.ts, define helper functions to manage the creation and retrieval of entities:

````ts
import { BigInt, Bytes } from "@graphprotocol/graph-ts"; // Import necessary types from graph-ts
import { Account } from "../../generated/schema"; // Import the Account entity from the generated Uniswap schema

// Helper function to load or create an Account entity
export function getOrCreateAccount(address: Bytes): Account {
  // Attempt to load an existing Account entity from the store using the address
  let account = Account.load(address.toHex());

  // If the Account entity does not exist, create and initialize a new one
  if (account == null) {
    account = new Account(address.toHex()); // Create a new Account entity with the address as ID
    account.totalSent = BigInt.fromI32(0); // Initialize totalSent field to 0
    account.totalReceived = BigInt.fromI32(0); // Initialize totalReceived field to 0
    account.sentCount = 0; // Initialize sentCount field to 0
    account.receivedCount = 0; // Initialize receivedCount field to 0
    account.save(); // Save the newly created Account entity to the store
  }

  // Return the Account entity, either loaded or newly created
  return account as Account;
}```

Helper Functions: These utility functions, such as `getOrCreateAccount`, are like trusty sidekicks in managing entities within the subgraph's datastore. They're crucial for creating, retreiving and updating entities, ensuring everything runs smoothly behind the scenes.It ensures entities are correctly instantiated and updated during event processing.
````

### Step 5: Implementing Mapping Functions Logic

````ts
Mapping functions in src/mappings/uniswap.ts are crucial for translating Ethereum smart contract events into GraphQL entities:

import { Transfer as TransferEvent } from "../../generated/Uniswap/Uniswap"; // Import the Transfer event from the Uniswap contract ABI
import { Transfer } from "../../generated/schema"; // Import the Transfer entity from the generated schema
import { getOrCreateAccount } from "../utils/helper"; // Import the helper function to get or create an Account entity

// Function to handle transfer events
export function handleTransfer(event: TransferEvent): void {
  // Load or create the 'from' account involved in the transfer
  let fromAccount = getOrCreateAccount(event.params.from);
  // Load or create the 'to' account involved in the transfer
  let toAccount = getOrCreateAccount(event.params.to);

  // Update the count of transfers sent by the 'from' account
  fromAccount.sentCount += 1;
  // Update the count of transfers received by the 'to' account
  toAccount.receivedCount += 1;

  // Update the total value of tokens sent by the 'from' account
  fromAccount.totalSent = fromAccount.totalSent.plus(event.params.amount);
  // Update the total value of tokens received by the 'to' account
  toAccount.totalReceived = toAccount.totalReceived.plus(event.params.amount);

  // Create a new Transfer entity with the unique transaction hash
  let transfer = new Transfer(event.transaction.hash.toHex());
  // Set the 'from' field of the Transfer entity to the 'from' account ID
  transfer.from = fromAccount.id;
  // Set the 'to' field of the Transfer entity to the 'to' account ID
  transfer.to = toAccount.id;
  // Set the value of the transfer to the value from the event
  transfer.value = event.params.amount;
  // Set the timestamp of the transfer to the block timestamp
  transfer.timestamp = event.block.timestamp;

  // Save the updated 'from' account entity to the store
  fromAccount.save();
  // Save the updated 'to' account entity to the store
  toAccount.save();
  // Save the new Transfer entity to the store
  transfer.save();
}```

Mapping Functions: Functions like handleTransfer act as event handlers for Ethereum smart contract events (TransferEvent). They instantiate new GraphQL entities (Transfer) using event data, update related account entities (fromAccount and toAccount), and ensure these changes are persistently stored in the subgraph's datastore.
````
