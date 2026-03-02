pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/functions/dev/v1_X/FunctionsClient.sol";
import "@chainlink/contracts/src/v0.8/functions/dev/libraries/FunctionsRequest.sol";
import "./AIModelIntegrator.sol"; // inherit or compose

contract VerifiableNLInterpreter is FunctionsClient, AIModelIntegrator {
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public constant DON_ID = 0x66756e2d706f6c79676f6e2d6d61696e6e65742d31000000000000000000000000; // fun-polygon-mainnet-1 (from Chainlink docs 2026)
    address public immutable functionsRouter = 0xdc2AAF042Aeff2E68B3e8E33F19e4B9fA7C73F10; // Polygon Mainnet router 2026

    event StrategyCompiled(string prompt, bytes32 requestId);

    constructor() FunctionsClient(functionsRouter) {}

    // Called from backend after NL compile → submits to Chainlink for verifiable refinement
    function requestRefinedStrategy(
        string calldata prompt,
        uint64 subscriptionId,
        uint32 gasLimit
    ) external returns (bytes32) {
        FunctionsRequest.Request memory req;
        req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, string(abi.encodePacked(
            "import { ethers } from 'npm:ethers@6.6.0';",
            "const steps = [];",
            // simple JS inference - expand to call lightweight model or API
            "if (args.prompt.includes('buy')) steps.push('Buy Token');",
            "if (args.prompt.includes('rwa')) steps.push('Invest in RWA Bond');",
            "return { steps };"
        )));

        req.addArgs(abi.encode(prompt));

        bytes32 requestId = _sendRequest(req.encodeCBOR(), subscriptionId, gasLimit, DON_ID);
        emit StrategyCompiled(prompt, requestId);
        return requestId;
    }

    // Override fulfill – store refined steps or params
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (err.length > 0) {
            // handle error
            return;
        }
        // Decode refined steps → store or emit for off-chain pickup
        (string[] memory refinedSteps) = abi.decode(response, (string[]));
        // Emit or store in workflow mapping (extend AIModelIntegrator)
    }
}