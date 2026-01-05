# Clicker NFT Evolution - Sui Clicker Game

A blockchain-based clicker game where your NFT evolves based on your total clicks. Built with Move on Sui blockchain.

## Live Demo

**Play Now:** [https://frontend-ipr7au56h-yassn0s-projects.vercel.app](https://frontend-ipr7au56h-yassn0s-projects.vercel.app)


## What is Clicker NFT Evolution?

Clicker NFT Evolution is an interactive clicker game where players mint their own NFT character that transforms through 5 tiers based on click count. The more you click, the more your character evolves - from a humble Noob to the legendary GOAT.

## Game Mechanics

### Evolution Tiers

| Tier | Name | Clicks Required | Special Condition |
|------|------|----------------|-------------------|
| 0 | Noob | 0 | Starting tier |
| 1 | Tryhard | 5 | - |
| 2 | No-life | 10 | - |
| 3 | Legend | 15 | - |
| 4 | GOAT | 20 | **Must be in Top 10** |

### GOAT System

The GOAT tier is special:
- Only the first 10 players to reach 20 clicks can become GOAT
- Once you're GOAT, you stay GOAT forever
- Managed by a shared `GOATRegistry` object that tracks GOAT addresses
- Creates exclusivity and competition among players

### NFT Features

- **Dynamic Metadata**: Name, image, tier, and click count update on-chain
- **Permanent Ownership**: NFT is owned by the player, stored in their wallet
- **Verifiable Progress**: All clicks are blockchain transactions with timestamps
- **Customizable Names**: Players can set custom nicknames for their NFTs

#### Access Control

- NFT functions require `&mut ClickerNFT` - only the owner can modify their NFT
- GOATRegistry is a shared object (`&mut GOATRegistry`) - anyone can read/write
- No admin privileges - fully decentralized

### Frontend Architecture

**Stack**:
- React 19 with TypeScript
- Vite for build tooling
- @mysten/dapp-kit for Sui wallet integration
- @radix-ui/themes for UI components

**Key Features**:
- Wallet connection (Sui Wallet, Suiet, Ethos)
- NFT minting interface
- Click button with real-time feedback
- Live NFT display with tier visualization
- GOAT badge for top players

### Testing

Comprehensive test suite with 8 unit tests

### Playing the Game

1. **Connect Wallet**: Click "Connect Wallet" and approve the connection
2. **Mint NFT**: Click "Mint Clicker NFT" to create your character (costs ~0.02 SUI)
3. **Start Clicking**: Click the "Click!" button to increment your counter
4. **Watch Evolution**: Your NFT automatically evolves at tier thresholds
5. **Reach GOAT**: Be one of the first 10 to reach 15 clicks!

## Project Structure

```
clicker-nft-evolution/
├── sources/
│   └── clicker_nft.move        # Smart contract implementation
├── tests/
│   └── clicker_game_tests.move # Comprehensive test suite
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # Main React component
│   │   ├── constants.ts        # Contract addresses
│   │   └── networkConfig.ts    # Sui network configuration
│   ├── public/                 # Static assets (images)
│   └── package.json            # Frontend dependencies
├── Move.toml                   # Move package configuration
├── Move.lock                   # Dependency lock file
└── PROJECT_README.md           # This file
```

## Author

Created by yassn0 for the 42 Workshop - Sui Move Certification Project
