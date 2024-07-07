# Subgraph Masterclass - P1 -ERC20

Welcome to the Beginner Level of the Subgraph Development Masterclass. This tutorial will guide you through the fundamentals of subgraph development using The Graph Studio, from setting up your environment to deploying your first subgraph.

## Overview

In this masterclass, you'll gain essential skills in subgraph development, enabling you to efficiently index and query blockchain data for decentralized applications (dApps).

## Learning Objectives

By completing this masterclass, you will:

- Understand the purpose and benefits of subgraphs in decentralized applications.
- Learn how to set up your development environment for subgraph development.
- Define GraphQL entities to model data structures for indexing Ethereum smart contract events.
- Implement mappings to transform blockchain events into entities in your subgraph.
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
- Initialize your subgraph with the commmand you copy from the studio.

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

- subgraph.yaml: Defines the subgraph manifest.
- schema.graphql: Contains the GraphQL schema.
- src/uniswap.ts: Contains the mapping functions.
- abis/: Contains the contract ABI files.

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
- Derived Fields:
  - @derivedFrom(field: "from"): This directive indicates that the sentTransfers field should be populated based on the from field of the Transfer entity.
  - @derivedFrom(field: "to"): This directive indicates that the receivedTransfers field should be populated based on the to field of the Transfer entity.

### Step 5: Helper Functions

// Import necessary types from the Graph Protocol TypeScript library
import { BigInt, Bytes } from "@graphprotocol/graph-ts"; 

// Import the Account entity from the generated schema
import { Account } from "../generated/schema"; 

/**
 * Helper function to load or create an Account entity.
 * This function attempts to load an Account entity from the store.
 * If the Account entity does not exist, it creates a new one with initial values.
 * 
 * @param address - The address of the account as a Bytes type.
 * @returns The Account entity.
 */
export function getOrCreateAccount(address: Bytes): Account {
  // Try to load the Account entity from the store using the address as a unique identifier
  let account = Account.load(address.toHex());

  // If the Account entity does not exist, create a new one
  if (account == null) {
    // Create a new Account entity with the address as the unique identifier
    account = new Account(address.toHex());
    // Initialize the totalSent field to 0
    account.totalSent = BigInt.fromI32(0); 
    // Initialize the totalReceived field to 0
    account.totalReceived = BigInt.fromI32(0); 
    // Save the new Account entity to the store
    account.save(); 
  }

  // Return the Account entity (either loaded or newly created)
  return account as Account;
}


### Step 6: Implementing Mapping Functions

````ts
Mapping functions in src/uniswap.ts are crucial for translating Ethereum smart contract events into GraphQL entities:

import { Transfer as TransferEvent } from "../generated/Uniswap/Uniswap";
import { Transfer } from "../generated/schema";
import { getOrCreateAccount } from "../src/helpers";

// Event handler function for the Transfer event
export function handleTransfer(event: TransferEvent): void {
  // Create a new Transfer entity with a unique ID (transaction hash + log index)
  let transfer = new Transfer(event.transaction.hash.toHex() + "-" + event.logIndex.toString());

  // Load or create the 'from' account
  let fromAccount = getOrCreateAccount(event.params.from);
  // Load or create the 'to' account
  let toAccount = getOrCreateAccount(event.params.to);

  // Set the Transfer entity fields
  transfer.from = fromAccount.id;
  transfer.to = toAccount.id;
  transfer.value = event.params.amount;
  transfer.timestamp = event.block.timestamp;

  // Save the Transfer entity to the store
  transfer.save();

  // Update the 'from' account's totalSent field
  fromAccount.totalSent = fromAccount.totalSent.plus(event.params.amount);
  // Save the updated 'from' account to the store
  fromAccount.save();

  // Update the 'to' account's totalReceived field
  toAccount.totalReceived = toAccount.totalReceived.plus(event.params.amount);
  // Save the updated 'to' account to the store
  toAccount.save();
}```

Mapping Functions:
These functions, such as `handleTransfer`, are event handlers responsible for processing Ethereum smart contract events (`TransferEvent`in this case). They create new instances of GraphQL entities (`Transfer`) based on event data, update associated account entities (`fromAccount` and `toAccount`), and save these entities to the subgraph's data store.
````
