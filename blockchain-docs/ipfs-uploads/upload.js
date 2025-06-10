const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');

// Replace these with your Pinata credentials
const pinata = new pinataSDK('8963485480b3211dca60', '9e28eef96dc6aced4c26b8752a083824a69b2bf12ae6985cb291805c5d580878');

const filePath = path.join(__dirname, 'sample.txt'); // This is the file you created

async function uploadFileToIPFS() {
  try {
    const readableStreamForFile = fs.createReadStream(filePath);

    const options = {
      pinataMetadata: {
        name: 'Institution-Test-File', // ✅ THIS IS WHAT WAS MISSING
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
    console.log('✅ File uploaded to IPFS via Pinata!');
    console.log('📦 IPFS Hash:', result.IpfsHash);
    console.log('🔗 IPFS Gateway URL:', `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
  } catch (error) {
    console.error('❌ Error uploading file:', error);
  }
}

uploadFileToIPFS();
