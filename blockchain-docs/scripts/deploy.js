const hre = require("hardhat");

async function main() {
  const FileStore = await hre.ethers.getContractFactory("FileStore");
  const fileStore = await FileStore.deploy(); // This returns the deployed contract in Ethers v6

  await fileStore.waitForDeployment(); // Ethers v6 equivalent of .deployed()

  console.log("✅ FileStore deployed to:", await fileStore.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
