# C0mrad - No-Code DeFi Automation App

Welcome to **C0mrad**, a revolutionary no-code, drag-and-drop decentralized application (DApp) built on 0G’s modular Layer 1 blockchain. C0mrad empowers users to create sophisticated crypto trading and DeFi automation workflows effortlessly, leveraging decentralized AI and real-time analytics. 

The deployment of key contracts—C0mradToken at 0x03A1a836FAEc7Dc83D39AaC91283fe42230b1835 (current version) and 0xd7d814043bf089B3AbdB00448a2Cd2fAf98697CA (earlier version), then C0mradCore Proxy at 0x55a4aD8A46F2B204e74F5D5861a6eAD8ccf89b08. 

The root hash of the uploaded file based on the workflow data "Test Workflow" with steps ["Buy Token", "Sell Token"] 0x9f0c5d0bb80a68e872c8bd000a8803efbdd5a3ba991e29fb0e4a963f2d37c00f. Simulating 0G Storage's verification process.

Key features include AI-driven risk assessments, RWA tokenization, flash loan simulations, and a gamified learning module. Our backend (Express.js) integrates with 0G Storage for workflow NFTs, while the Next.js frontend offers a drag-and-drop interface.


This README provides an overview, setup instructions, and roadmap for this innovative project.

- **Repository**: [https://github.com/ernnies/C0mrad](https://github.com/ernnies/C0mrad)  
- **Author**: ernnies  
- **Created**: August 21, 2025  
- **License**: MIT License (see LICENSE file)

---

## What it Does

C0mrad is designed to democratize DeFi automation by offering a user-friendly interface where non-technical users can build complex trading strategies (e.g., automated swaps, yield farming, arbitrage) using a drag-and-drop system. Powered by 0G’s decentralized AI infrastructure, it provides real-time market insights, secure onchain execution, and scalable data management, making advanced financial tools accessible to all.

---

## The Problem it Solves

Traditional DeFi platforms require coding skills, incur high costs, and rely on centralized AI, limiting accessibility and transparency. C0mrad addresses these issues by:
- Eliminating technical barriers with a no-code interface.
- Reducing costs through 0G’s efficient blockchain and storage solutions.
- Ensuring transparency and verifiability with decentralized AI and onchain workflows.

---

## Features

- **No-Code Drag-and-Drop Interface**: Create trading workflows without coding expertise.  
- **AI-Powered Analytics**: Leverage 0G Compute for real-time market predictions and optimizations.  
- **Decentralized Storage**: Securely store workflows and data on 0G Storage.  
- **Scalable Data Access**: Utilize 0G Data Availability for high-throughput market data.  
- **EVM-Compatible Execution**: Deploy and run smart contracts on 0G Chain.  
- **Customizable Dashboards**: Visualize portfolio performance with Tailwind-styled UI.  

---

## Technologies Used

- **Next.js**: For a fast, scalable, and SEO-friendly front-end.  
- **TypeScript**: Ensures type-safe, maintainable code.  
- **Tailwind CSS**: Provides a responsive, customizable UI for the drag-and-drop experience.  
- **0G Blockchain Services**:  
  - 0G Chain for smart contract execution.  
  - 0G Compute for AI inference and training.  
  - 0G Storage for decentralized data persistence.  
  - 0G Data Availability for scalable data access.  
- **IPFS**: For decentralized storage of assets like workflow visuals.  

---

## How to Set Up

### Prerequisites
- Node.js (v18 or later)  
- npm or yarn  
- 0G testnet account (see 0G documentation for setup)  
- Git  

### Installation
```bash
git clone https://github.com/ernnies/C0mrad.git
cd C0mrad
````

Install dependencies:

```bash
npm install
# or
yarn install
```

Configure environment variables:
Create a `.env.local` file based on `.env.example`.
Add your 0G testnet API keys and wallet details.

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Testing

Run tests with:

```bash
npm test
# or
yarn test
```

Ensure 0G testnet is configured for smart contract testing.

---

## How We Built It

* **Ideation**: Conducted research on DeFi user needs and designed a no-code workflow builder.
* **Prototype**: Developed a demo using Next.js and Tailwind CSS, integrating 0G Chain for smart contracts.
* **AI Integration**: Leveraged 0G Compute to add basic AI-driven market analysis.
* **Storage & Scalability**: Implemented 0G Storage for workflow persistence and 0G DA for real-time data.
* **UI/UX**: Iteratively refined the drag-and-drop interface based on user feedback.

---

## Challenges We Ran Into

* Syncing 0G Compute’s AI inference with real-time 0G DA data required extensive debugging.
* Optimizing the drag-and-drop UI for diverse DeFi protocols was complex and time-consuming.
* Ensuring gas efficiency on 0G Chain involved multiple iterations of smart contract optimization.
* Handling unpredictable market data for AI models posed initial accuracy challenges.

---

## What We Learned

* Mastered 0G’s modular architecture, balancing Chain, Compute, Storage, and DA effectively.
* Gained insights into optimizing AI for blockchain constraints.
* Understood the importance of user-centric design for no-code platforms.
* Developed interdisciplinary skills blending AI, blockchain, and front-end development.

---

## Roadmap

### Wave 1: Ideation and Prototype Development

**Status**: Completed
Defined features, built a demo with basic drag-and-drop UI, and deployed initial smart contracts on 0G testnet.

### Wave 2: Core DeFi Automation Platform

**Status**: In Progress
Develop a drag-and-drop interface for trading strategies, integrate 0G Compute for AI analytics, and launch a portfolio dashboard.

### Wave 3: Enhanced Features and Community Interaction

**Status**: Planned
Add Strategy Notes and Market Updates, integrate 0G DA for a Discover section, and optimize for gas efficiency.

### Wave 4: Advanced Customization and Usability

**Status**: Planned
Introduce workflow categories, revamp homepage, and enhance UX with loading spinners and protocol presets.

### Wave 5: Full Customization and Mainnet Deployment

**Status**: Planned
Add workflow customization, tipping features, IPFS uploads, and deploy on 0G mainnet with a revamped UI.

---

## What's Next for C0mrad

* Enhance AI models with machine learning for predictive trading.
* Expand to multi-chain support beyond 0G.
* Launch a community marketplace for sharing workflows.
* Develop a mobile app and conduct security audits.
* Aim to become the leading DeFi automation tool on the decentralized web.

---

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests. For major changes, please open an issue first to discuss.

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgments

Gratitude to the 0G team for their support

---

# C0mrad Roadmap

Welcome to the **C0mrad Roadmap**, a detailed guide outlining the journey of building a no-code DeFi automation app on 0G’s modular Layer 1 blockchain.

---

## Wave 1: Ideation and Prototype Development

**Objective**: Lay the foundation by brainstorming ideas and creating a functional demo to validate the concept.

* **Tasks**:

  * Conduct market research to identify DeFi user pain points (e.g., complexity, cost).
  * Sketch a no-code drag-and-drop interface for trading workflows.
  * Build a prototype using Next.js, TypeScript, and Tailwind CSS.
  * Deploy a basic smart contract on 0G Chain’s testnet for token swaps.
  * Experiment with 0G Compute for a simple AI price predictor and 0G Storage for workflow saving.

* **Features Delivered**:

  * A working demo with a drag-and-drop UI for creating a basic trading strategy.
  * Initial smart contract integration on 0G testnet.
  * Conceptual framework for AI and storage integration.

```mermaid
graph TD
    A[Ideation Planet] -->|Research| B[Rocket: C0mrad]
    B -->|Launch| C[Demo Star]
    C --> D[0G Chain Satellite]
    C --> E[0G Compute Satellite]
    C --> F[0G Storage Satellite]
```

---

## Wave 2: Core DeFi Automation Platform

**Objective**: Build the first usable version, enabling users to create and execute DeFi workflows as onchain assets.

* **Tasks**:

  * Develop a robust drag-and-drop interface for strategies like automated swaps or staking.
  * Deploy advanced smart contracts on 0G Chain to handle workflow execution.
  * Integrate 0G Compute for AI-driven trend analysis (e.g., moving averages).
  * Use 0G Storage to securely store user workflows and AI outputs.
  * Design a dynamic dashboard with Tailwind CSS to display portfolio performance.

* **Features Delivered**:

  * Users can create a workflow (e.g., “buy Token X at 5% dip”) via the no-code interface.
  * Workflows saved as onchain assets, ensuring ownership and transparency.
  * AI-powered price trend analysis enhances trading decisions.

```mermaid
graph TD
    A[Workflow Factory] -->|Build| B[Strategy Blocks]
    B -->|Transport| C[0G Chain Train]
    C --> D[Portfolio Tower]
    E[AI Robots: 0G Compute] -->|Analyze| D
    F[Storage Vaults: 0G Storage] -->|Secure| D
```

---

## Wave 3: Enhanced Features and Community Interaction

**Objective**: Enrich C0mrad with social tools and analytics to build a collaborative DeFi ecosystem.

* **Tasks**:

  * Add a “Strategy Notes” feature for users to share trading tips.
  * Implement a “Market Updates” section for posting workflow successes.
  * Leverage 0G Data Availability to power a searchable “Discover” section.
  * Optimize 0G Chain smart contracts for low-cost transactions.
  * Enhance the dashboard with real-time AI predictions from 0G Compute.

* **Features Delivered**:

  * Community-driven Strategy Notes and Market Updates for knowledge sharing.
  * Discover section to explore popular strategies, supported by 0G DA.
  * Gas-optimized transactions and advanced market insights.

```mermaid
graph TD
    A[Knowledge Fountain] -->|Flow| B[Discover Lake]
    B -->|Connect| C[0G DA Bridge]
    C --> D[Trading Forum]
    E[AI Oracles: 0G Compute] -->|Insight| D
    F[Gas-Efficient Roads: 0G Chain] -->|Support| D
```

---

## Wave 4: Advanced Customization and Usability

**Objective**: Improve onboarding and interface to broaden user adoption and satisfaction.

* **Tasks**:

  * Add workflow categories (e.g., Trading, Yield Farming) during creation.
  * Redesign the homepage with a hero section and “How It Works” guide.
  * Integrate loading spinners and success messages for better UX.
  * Simplify workflow creation with pre-selected DeFi protocols (e.g., Uniswap).
  * Launch a dedicated Explore page for discovering community strategies.

* **Features Delivered**:

  * Categorized workflows for tailored user experiences.
  * Enhanced homepage and UX feedback mechanisms.
  * Streamlined creation with protocol presets and a new Explore page.

```mermaid
graph TD
    A[Category Gates] -->|Enter| B[UX Spaceship]
    B -->|Land| C[Protocol Planet]
    D[Loading Beacons] -->|Guide| C
    E[Explore Observatory] -->|View| C
```

---

## Wave 5: Full Customization and Mainnet Deployment

**Objective**: Deliver a polished, mainnet-ready platform with advanced features and global reach.

* **Tasks**:

  * Introduce live-preview workflow customization with AI-driven suggestions.
  * Offer curated workflow templates (e.g., “Arbitrage Bot”).
  * Add a tipping feature for shared strategies, linked to 0G Chain explorer.
  * Integrate IPFS for uploading custom assets like strategy visuals.
  * Revamp UI with CSS modules and deploy on 0G mainnet.

* **Features Delivered**:

  * Fully customizable workflows with live previews.
  * Curated templates and a tipping system for community support.
  * IPFS uploads and a mainnet-ready, mobile-optimized UI.

```mermaid
graph TD
    A[Customization Nebula] -->|Orbit| B[Template Star]
    C[Tipping Comets] -->|Streak| D[Mainnet Galaxy]
    E[IPFS Moons] -->|Store| D
    F[UI Constellation] -->|Illuminate| D
```

---

## Vision Beyond Wave 5

* Enhance AI with machine learning for predictive trading.
* Support multi-chain interoperability.
* Launch a marketplace for trading workflows.
* Develop a mobile app and conduct security audits.
* Establish C0mrad as the premier DeFi automation platform on the decentralized web.

```