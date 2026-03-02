pragma solidity ^0.8.20;

import "./utils/AccessControl.sol";

abstract contract AgentCore is AccessControl {
    address public gelatoForwarder; // Gelato relay address

    event AgentTriggered(bytes32 taskId, string action);

    constructor(address _gelatoForwarder) {
        gelatoForwarder = _gelatoForwarder;
    }

    // Called by Gelato
    function agentExecute(bytes calldata data) external virtual;
}