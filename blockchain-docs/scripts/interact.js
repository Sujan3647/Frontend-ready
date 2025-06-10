const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // use your contract address

async function main() {
    const fileStore = await ethers.getContractAt("FileStore", CONTRACT_ADDRESS);
    
    const fileCount = await fileStore.files.length;
    console.log(`📁 Total Files: ${fileCount}`);

    for (let i = 0; i < fileCount; i++) {
        const file = await fileStore.files(i);
        console.log(`📄 File ${i + 1}`);
        console.log(`   🔗 IPFS Hash: ${file.ipfsHash}`);
        console.log(`   👤 Uploaded by: ${file.uploadedBy}`);
        console.log(`   🕒 Timestamp: ${new Date(file.timestamp * 1000).toLocaleString()}`);
        console.log(`   🌐 Gateway: https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`);
    }
}

main().catch((error) => {
    console.error("❌ Error:", error);
});
