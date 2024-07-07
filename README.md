# Beginner Level Subgraph Development Masterclass - L1 - ERC-20

Welcome to the Beginner Level of the Subgraph Development Masterclass. This tutorial will guide you through the fundamentals of subgraph development using The Graph platform, from setting up your environment to deploying your first subgraph.

## Overview

In this masterclass, you'll gain essential skills in subgraph development, enabling you to efficiently index and query blockchain data for decentralized applications (dApps).

## Learning Objectives

By completing this masterclass, you will:

- Understand the purpose and benefits of subgraphs in decentralized applications.
- Learn how to set up your development environment for subgraph development.
- Define GraphQL entities to model data structures for indexing Ethereum smart contract events.
- Implement mappings to transform blockchain events into entities in your subgraph.
- Deploy your subgraph to The Graph's hosted service for querying.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Graph CLI](https://github.com/graphprotocol/graph-cli)

## Step-by-Step Tutorial

### Step 1: Setting Up Your Development Environment

1. **Create a new directory for your project and navigate into it:**

   ```bash
   mkdir my-first-subgraph
   cd my-first-subgraph
   ```

## Initialize a new subgraph project using the Graph CLI

graph init --from-contract 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 --network mainnet my-first-subgraph

This command sets up the basic structure for your subgraph project, including necessary configuration files
