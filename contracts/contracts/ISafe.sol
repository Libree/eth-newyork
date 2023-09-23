pragma solidity ^0.8.0;


import {Enum} from "@safe-global/safe-contracts/contracts/common/Enum.sol";

interface ISafe {
    function execTransactionFromModule(address to, uint256 value, bytes calldata data, Enum.Operation operation)
        external
        returns (bool success);
}