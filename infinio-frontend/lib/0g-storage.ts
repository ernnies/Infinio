import { Indexer, ZgFile } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';
import { Workflow } from './types'; 

// Env vars
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://evmrpc-testnet.0g.ai/';
const INDEXER_RPC = process.env.NEXT_PUBLIC_INDEXER_RPC || 'https://indexer-storage-testnet-turbo.0g.ai';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY is required in .env.local');
}

let indexer: Indexer | null = null;
let signer: ethers.Wallet | null = null;
let provider: ethers.JsonRpcProvider | null = null;

const init0G = async () => {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(RPC_URL);
    signer = new ethers.Wallet(PRIVATE_KEY, provider);
    indexer = new Indexer(INDEXER_RPC);
  }
  return { provider, signer, indexer };
};

// Upload workflow as JSON file to 0G Storage
export const uploadWorkflow = async (workflow: Workflow, fileName: string = 'workflow.json') => {
  await init0G();
  if (!indexer || !signer) throw new Error('0G not initialized');

  // Create JSON file content
  const jsonContent = JSON.stringify(workflow, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const file = await ZgFile.fromBlob(blob, fileName);

  // Generate Merkle tree for verification
  const [tree, treeErr] = await file.merkleTree();
  if (treeErr) throw new Error(`Merkle tree error: ${treeErr}`);

  console.log('Workflow Root Hash:', tree?.rootHash());

  // Upload to 0G Storage
  const [tx, uploadErr] = await indexer.upload(file, RPC_URL, signer);
  if (uploadErr) throw new Error(`Upload error: ${uploadErr}`);

  await file.close();
  return { rootHash: tree?.rootHash(), txHash: tx };
};

// Download workflow by root hash
export const downloadWorkflow = async (rootHash: string): Promise<Workflow> => {
  await init0G();
  if (!indexer) throw new Error('0G not initialized');

  // Download with Merkle proof verification
  const filePath = `./temp-${rootHash}.json`; // Temp local path
  const err = await indexer.download(rootHash, filePath, true);
  if (err) throw new Error(`Download error: ${err}`);

  // Read and parse JSON
  const fs = require('fs');
  const jsonContent = fs.readFileSync(filePath, 'utf8');
  const workflow: Workflow = JSON.parse(jsonContent);

  // Cleanup temp file
  fs.unlinkSync(filePath);

  return workflow;
};

export const uploadToKV = async (streamId: string, key: string, value: string) => {
  await init0G();
  if (!indexer || !signer) throw new Error('0G not initialized');

  const [nodes, err] = await indexer.selectNodes(1);
  if (err) throw new Error(`Node selection error: ${err}`);

 const flowContract = getFlowContract(signer, RPC_URL); // Placeholder; use actual SDK import
  const batcher = new Batcher(1, nodes, flowContract, RPC_URL);

  const keyBytes = new TextEncoder().encode(key);
  const valueBytes = new TextEncoder().encode(value);
  batcher.streamDataBuilder.set(streamId, keyBytes, valueBytes);

  const [tx, batchErr] = await batcher.exec();
  if (batchErr) throw new Error(`Batch error: ${batchErr}`);

  return tx;
};

export const downloadFromKV = async (streamId: string, key: string): Promise<string | null> => {
  const kvClientAddr = 'http://3.101.147.150:6789'; 
  const kvClient = new KvClient(kvClientAddr);
  const keyBytes = new TextEncoder().encode(key);
  const encodedKey = ethers.encodeBase64(keyBytes);
  return await kvClient.getValue(streamId, encodedKey);
};