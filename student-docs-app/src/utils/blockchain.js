import { ethers } from 'ethers';
import FileStore from '../abi/FileStore.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // update if redeployed

export const getAllFiles = async () => {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, FileStore.abi, signer);

    // ✅ Destructure the 4 arrays returned by getAllFiles()
    const [ipfsHashes, studentBlockIds, uploaders, timestamps] =
      await contract.getAllFiles();

    // ✅ Return structured file objects
    return ipfsHashes.map((hash, i) => ({
      ipfsHash: hash,
      studentBlockId: studentBlockIds[i],
      uploadedBy: uploaders[i],
      timestamp: new Date(Number(timestamps[i]) * 1000).toLocaleString(),
      gatewayURL: `https://gateway.pinata.cloud/ipfs/${hash}`,
    }));
  } catch (err) {
    console.error('❌ Error fetching files from smart contract:', err);
    return [];
  }
};
