pragma solidity ^0.8.20;

import "./AgentCore.sol";
import "../core/interfaces/IC0mradCore.sol";

contract PerpetualRebalanceAgent is AgentCore {
    IC0mradCore public strategy;

    constructor(address _gelato, address _strategy) AgentCore(_gelato) {
        strategy = IC0mradCore(_strategy);
    }

    function agentExecute(bytes calldata data) external override {
        require(msg.sender == gelatoForwarder, "Only Gelato");
        // Decode data → rebalance call
        strategy.rebalance(/* params from data */);
        emit AgentTriggered(keccak256(data), "rebalance");
    }
}