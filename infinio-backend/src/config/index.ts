import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  polygon: {
    rpcUrl: process.env.POLYGON_RPC_URL!,
    privateKey: process.env.PRIVATE_KEY!,
  },

  cdk: {
    rpcUrl: process.env.CDK_RPC_URL || '',
    chainId: Number(process.env.CDK_CHAIN_ID) || 0,
  },

  features: {
    nlCompiler: process.env.FEATURE_NL_COMPILER === 'true',
    cdkDeploy: process.env.FEATURE_CDK_DEPLOY === 'true',
    agentMode: process.env.FEATURE_AGENT_MODE === 'true',
  },

  chainlink: {
    functionsRouter: process.env.CHAINLINK_FUNCTIONS_ROUTER || '',
  },
};