// src/pages/InstitutionDashboard.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { uploadFileToIPFS } from "../utils/uploadToIPFS";
import { ethers } from "ethers";
import FileStore from "../abi/FileStore.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ✅ Confirm this matches deployment

export default function InstitutionDashboard() {
  const [formData, setFormData] = useState({
    studentName: "",
    enrollmentId: "",
    studentBlockId: "",
    documentTitle: "",
    documentFile: null,
  });
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "documentFile") {
      const file = files[0];
      setFormData({ ...formData, documentFile: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.documentFile) {
      alert("Please select a file.");
      return;
    }
    if (!formData.studentBlockId) {
      alert("Please enter Student Block ID.");
      return;
    }

    try {
      setMessage("⏳ Uploading to IPFS...");
      const { ipfsHash } = await uploadFileToIPFS(formData.documentFile);

      if (!window.ethereum) {
        alert("Please install MetaMask.");
        return;
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, FileStore.abi, signer);

      setMessage("⏳ Storing on blockchain...");
      const tx = await contract.uploadFile(ipfsHash, formData.studentBlockId);
      await tx.wait();

      setMessage("✅ Successfully uploaded!");
    } catch (err) {
      console.error("Upload Error:", err);
      setMessage("❌ Upload failed — see console.");
    } finally {
      setFormData({
        studentName: "",
        enrollmentId: "",
        studentBlockId: "",
        documentTitle: "",
        documentFile: null,
      });
      setPreview(null);
      document.getElementById("fileInput").value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          📤 Upload Document to Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="👤 Student Name"
              className="p-3 rounded-lg border"
              required
            />
            <input
              type="text"
              name="enrollmentId"
              value={formData.enrollmentId}
              onChange={handleChange}
              placeholder="🆔 Enrollment ID"
              className="p-3 rounded-lg border"
              required
            />
            <input
              type="text"
              name="studentBlockId"
              value={formData.studentBlockId}
              onChange={handleChange}
              placeholder="🔗 Student Block ID"
              className="p-3 rounded-lg border col-span-1 sm:col-span-2"
              required
            />
            <input
              type="text"
              name="documentTitle"
              value={formData.documentTitle}
              onChange={handleChange}
              placeholder="📄 Document Title"
              className="p-3 rounded-lg border col-span-1 sm:col-span-2"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">
              🖼️ Upload File (image or PDF)
            </label>
            <input
              id="fileInput"
              type="file"
              name="documentFile"
              accept="image/*,.pdf"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {preview && (
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-2">Preview:</div>
              {formData.documentFile?.type.startsWith("image") ? (
                <img src={preview} alt="Preview" className="max-h-64 rounded shadow border" />
              ) : (
                <div className="bg-gray-200 text-gray-700 p-4 rounded shadow">
                  <strong>PDF file:</strong> {formData.documentFile.name}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-lg font-semibold hover:shadow-lg transition-all"
          >
            🚀 Upload Document
          </button>
        </form>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 ${
              message.includes("✅")
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-yellow-100 border-yellow-400 text-yellow-700"
            } px-4 py-3 rounded-lg text-center`}
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
