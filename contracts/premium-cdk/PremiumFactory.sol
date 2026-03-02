pragma solidity ^0.8.20;

import "./PremiumStrategy.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract PremiumFactory {
    address public immutable implementation;

    event PremiumDeployed(address indexed instance, address owner);

    constructor() {
        implementation = address(new PremiumStrategy());
    }

    function deployPremium(
        address flashLoanProvider,
        /* params */
    ) external returns (address) {
        address proxy = Clones.clone(implementation);
        PremiumStrategy(proxy).initialize(flashLoanProvider /* ... */);
        emit PremiumDeployed(proxy, msg.sender);
        return proxy;
    }
}