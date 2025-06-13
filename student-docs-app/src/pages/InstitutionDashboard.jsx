import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { uploadFileToIPFS } from "../utils/uploadToIPFS";
import { ethers } from "ethers";
import FileStore from "../abi/FileStore.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
  const [institution, setInstitution] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentInstitution");
    if (stored) {
      setInstitution(JSON.parse(stored));
    }
  }, []);

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
    if (!formData.documentFile || !formData.studentBlockId) {
      alert("Please fill all fields and select a file.");
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

      setMessage("✅ Document uploaded successfully!");
    } catch (err) {
      console.error("Upload Error:", err);
      setMessage("❌ Upload failed. See console.");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center p-6 md:p-10">
      {/* Institution Info Card */}
      {institution && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white w-full max-w-3xl mb-8 p-6 rounded-2xl shadow-lg border"
        >
          <h3 className="text-xl md:text-2xl font-bold text-indigo-700 mb-2">🏛 Institution Info</h3>
          <p className="text-gray-700">
            <strong>Name:</strong> {institution.name}
          </p>
          <p className="text-gray-700">
            <strong>Institution Number:</strong> {institution.institutionNo}
          </p>
          <p className="text-gray-700">
            <strong>Block ID:</strong> {institution.blockId}
          </p>
        </motion.div>
      )}

      {/* Upload Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-3xl p-8 md:p-10"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-10">
          📤 Upload Document to Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="👤 Student Name"
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
            <input
              type="text"
              name="enrollmentId"
              value={formData.enrollmentId}
              onChange={handleChange}
              placeholder="🆔 Enrollment ID"
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
            <input
              type="text"
              name="studentBlockId"
              value={formData.studentBlockId}
              onChange={handleChange}
              placeholder="🔗 Student Block ID"
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition col-span-1 md:col-span-2"
              required
            />
            <input
              type="text"
              name="documentTitle"
              value={formData.documentTitle}
              onChange={handleChange}
              placeholder="📄 Document Title"
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition col-span-1 md:col-span-2"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">🖼️ Upload File</label>
            <input
              id="fileInput"
              type="file"
              name="documentFile"
              accept="image/*,.pdf"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {preview && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <div className="text-sm text-gray-500 mb-2 font-medium">Preview:</div>
              {formData.documentFile?.type.startsWith("image") ? (
                <img src={preview} alt="Preview" className="max-h-64 rounded-xl border shadow" />
              ) : (
                <div className="bg-gray-200 p-4 rounded-xl shadow text-gray-700">
                  📄 <strong>{formData.documentFile.name}</strong> (PDF)
                </div>
              )}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl transition"
          >
            🚀 Upload Document
          </motion.button>
        </form>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-6 text-center px-4 py-3 rounded-xl shadow-md ${
              message.includes("✅")
                ? "bg-green-100 text-green-700 border border-green-300"
                : message.includes("❌")
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-yellow-100 text-yellow-700 border border-yellow-300"
            }`}
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
