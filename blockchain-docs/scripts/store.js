const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // ✅ latest deployed address
const IPFS_HASH = "QmRqxE9SVt7jXotoXqBJfXMcagHdiqDEiF7qiAmBwCs6Pi"; // ✅ your uploaded hash

async function main() {
    const fileStore = await ethers.getContractAt("FileStore", CONTRACT_ADDRESS);

    const tx = await fileStore.storeFile(IPFS_HASH);
    await tx.wait();

    console.log("✅ IPFS hash stored on blockchain.");
}

main().catch((error) => {
    console.error("❌ Error storing file:", error);
    process.exitCode = 1;
});
