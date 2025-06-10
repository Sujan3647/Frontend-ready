// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStore {
    struct File {
        string ipfsHash;
        string studentBlockId;
        address uploadedBy;
        uint256 timestamp;
    }

    File[] public files;

    event FileStored(string ipfsHash, string studentBlockId, address indexed uploadedBy, uint256 timestamp);

    function uploadFile(string memory _ipfsHash, string memory _studentBlockId) public {
        files.push(File(_ipfsHash, _studentBlockId, msg.sender, block.timestamp));
        emit FileStored(_ipfsHash, _studentBlockId, msg.sender, block.timestamp);
    }

    // ✅ FIXED: Instead of returning File[], return tuples of arrays
    function getAllFiles() public view returns (
        string[] memory ipfsHashes,
        string[] memory studentBlockIds,
        address[] memory uploaders,
        uint256[] memory timestamps
    ) {
        uint256 len = files.length;
        ipfsHashes = new string[](len);
        studentBlockIds = new string[](len);
        uploaders = new address[](len);
        timestamps = new uint256[](len);

        for (uint256 i = 0; i < len; i++) {
            File storage f = files[i];
            ipfsHashes[i] = f.ipfsHash;
            studentBlockIds[i] = f.studentBlockId;
            uploaders[i] = f.uploadedBy;
            timestamps[i] = f.timestamp;
        }
    }
}
