pragma solidity ^0.8.0;

import {ModuleManager} from "@safe-global/safe-contracts/contracts/base/ModuleManager.sol";
import {ISafe} from "./ISafe.sol";
import {Enum} from "@safe-global/safe-contracts/contracts/common/Enum.sol";
import {ProofVerifier} from "./ProofVerifier.sol";

contract LenderModule is ModuleManager {
    address verifierAddress;

    constructor(address _verifierAddress) {
        verifierAddress = _verifierAddress;
    }

    function withdraw(
        address _safe,
        address _asset,
        uint256 _amount,
        address _to
    ) external {
        require(
            ProofVerifier(verifierAddress).isUserValidated(msg.sender),
            "Not validated"
        );

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
