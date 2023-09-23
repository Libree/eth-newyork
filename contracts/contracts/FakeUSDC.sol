// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeUSDC is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        address minter
    ) ERC20(name, symbol) {
        _mint(minter, 10000 * 1e18);
    }
}
