const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentsChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

developmentsChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async () => {
      let fundMe
      let deployer
      const sendValue = ethers.utils.parseEther("1") // 1 ETH
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        fundMe = await ethers.getContract("FundMe", deployer)
      })

      it("allows people to fund and withdraw", async () => {
        await fundMe.fund({ value: sendValue })
        await fundMe.withdraw()
        const endingBalance = await fundMe.provider.getBalance(fundMe.address)
        assert.equal(endingBalance.toString(), "0")
      })
    })
