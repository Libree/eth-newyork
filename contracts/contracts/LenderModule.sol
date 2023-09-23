pragma solidity ^0.8.0;

import {ModuleManager} from "@safe-global/safe-contracts/contracts/base/ModuleManager.sol";
import {ISafe} from "./ISafe.sol";
import {Enum} from "@safe-global/safe-contracts/contracts/common/Enum.sol";

contract FounderTansfersModule is ModuleManager {
    function withdraw(
        address _safe,
        address _asset,
        uint256 _amount,
        address _to
    ) external {
        ISafe safe = ISafe(_safe);

        bytes memory data = abi.encodeWithSignature(
            "transfer(address,uint256)",
            _to,
            _amount
        );
        require(
            safe.execTransactionFromModule(
                _asset,
                0,
                data,
                Enum.Operation.Call
            ),
            "Could not execute token transfer"
        );
    }
}
