# Wavehack Grant Tracker

The WaveHack Grant Tracker is a powerful and user-friendly application designed for meticulous monitoring and analysis of wavehack grant distributions. It provides detailed tracking of key grant information, including recipient addresses, grant amounts, distribution dates, senders, and transaction hashes. The tracker also features comprehensive functionalities such as aggregating the total grants received by each address and listing recent distributions for enhanced transparency. Its advanced search functionality allows users to efficiently filter and find specific grant data. Powered by The Graph subgraph, the WaveHack Grant Tracker ensures real-time and reliable data management, making it an indispensable tool for transparent and efficient wavehack grant tracking.

![Screen2](https://github.com/user-attachments/assets/b4627a1c-cb7c-49b7-b0c1-c4991c0924b5)

## Deployed Resources:

- [Wavehack Grant Tracker Subgraph](https://api.studio.thegraph.com/query/18583/wavehack-grant-tracker/version/latest)
- [Wavehack Grant Tracker App](https://wavehack-grant-tracker.vercel.app/)

## Getting Started

### Subgraph Deployment

1. Go to [Subgraph Studio](https://thegraph.com/studio), connect wallet and create a new subgraph.

2. Copy subgraph slug and deploy key.

3. Update the subgraph slug in `package.json` scripts.

4. Run the following commands to deploy the subgraph:

```bash

npm run codegen

graph auth --studio <DEPLOY KEY>

graph deploy --node https://api.studio.thegraph.com/deploy/ <SUBGRAPH_SLUG>

```

### Frontend Setup

> Note: Make sure to update the subgraph endpoint and chain config in `frontend/app/utils/constants.js`

```bash
cd frontend

npm install

npm run dev

```

Open http://localhost:3000 with your browser to see the result.

### Screenshots

![Screen1](https://github.com/user-attachments/assets/ebca5b54-4496-4d2a-bad9-9574280f6365)
![Screen2](https://github.com/user-attachments/assets/b4627a1c-cb7c-49b7-b0c1-c4991c0924b5)
![Screen3](https://github.com/user-attachments/assets/da8ce578-05ee-4c28-a57a-23ec5bc0756c)

## Built With

- [The Graph](https://thegraph.com/)
- [Next.js](https://nextjs.org/)
- [Ant Design](https://ant.design/)
- [Ethers.js](https://docs.ethers.io/v5/)

## References

- [The Graph Documentation](https://thegraph.com/docs/en/)
- [Ethers.js Documentation](https://docs.ethers.io/v5/)
- [Next.js Documentation](https://nextjs.org/docs/getting-started)

## Safety

This is experimental software and subject to change over time.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
