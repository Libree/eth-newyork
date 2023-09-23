// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./ZKPVerifier.sol";

contract ProofVerifier is Ownable, ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;
    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

    mapping(address => bool) isValidated;

    function _beforeProofSubmit(
        uint64 /* requestId */,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that  challenge input is address of sender
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        // this is linking between msg.sender and
        require(
            _msgSender() == addr,
            "address in proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID && addressToId[_msgSender()] == 0,
            "proof can not be submitted more than once"
        );
        isValidated[_msgSender()] = true;
    }

    function isUserValidated(address _user) external view returns (bool) {
        return isValidated[_user];
    }
}
