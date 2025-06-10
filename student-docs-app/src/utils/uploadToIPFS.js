import axios from 'axios';

const PINATA_API_KEY = '8963485480b3211dca60';
const PINATA_SECRET_API_KEY = '9e28eef96dc6aced4c26b8752a083824a69b2bf12ae6985cb291805c5d580878';

export const uploadFileToIPFS = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const metadata = JSON.stringify({
    name: file.name,
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', options);

  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    );

    const hash = res.data.IpfsHash;
    return {
      ipfsHash: hash,
      gatewayURL: `https://gateway.pinata.cloud/ipfs/${hash}`,
    };
  } catch (error) {
    console.error('❌ IPFS Upload Error:', error);
    throw new Error('Failed to upload to IPFS');
  }
};
