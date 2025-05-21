import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddNestedImages = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mainImages, setMainImages] = useState([]);
  const [selectedMainId, setSelectedMainId] = useState(id || "");
  const [pendingItems, setPendingItems] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentPreview, setCurrentPreview] = useState("");
  const [currentDetails, setCurrentDetails] = useState({
    title: "",
    description: "",
    label: "",
  });
  const [loading, setLoading] = useState({ fetching: true, uploading: false });
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchMainGallery = async () => {
      try {
        const response = await axios.get(`https://planyourhome-backend.onrender.com/api/gallery`);
        setMainImages(response.data.data);
      } catch (err) {
        setError("Failed to load gallery list");
      } finally {
        setLoading((prev) => ({ ...prev, fetching: false }));
      }
    };
    fetchMainGallery();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCurrentPreview(reader.result);
      setCurrentFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleAddToList = () => {
    if (!currentFile) return;
    if (pendingItems.length >= 10) {
      setError("Maximum 10 images allowed");
      return;
    }

    setPendingItems([...pendingItems, {
      id: Date.now(),
      file: currentFile,
      preview: currentPreview,
      details: currentDetails
    }]);

    // Reset current selections
    setCurrentFile(null);
    setCurrentPreview("");
    setCurrentDetails({ title: "", description: "", label: "" });
    fileInputRef.current.value = "";
    setError("");
  };

  const removePendingItem = (id) => {
    setPendingItems(pendingItems.filter(item => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMainId) return setError("Please select a main image");
    if (pendingItems.length === 0) return setError("Please add at least one image");

    setLoading((prev) => ({ ...prev, uploading: true }));
    setError("");

    try {
      const formData = new FormData();
      pendingItems.forEach(item => {
        formData.append("nestedImages", item.file);
      });
      formData.append("nestedDetails", JSON.stringify(pendingItems.map(item => item.details)));

      const response = await axios.post(
        `https://planyourhome-backend.onrender.com/api/gallery/${selectedMainId}/nested`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        navigate(`/portifolio`, {
          state: {
            message: `Added ${pendingItems.length} nested image(s) successfully!`,
            scrollTo: "nested-slides",
          },
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload nested images");
    } finally {
      setLoading((prev) => ({ ...prev, uploading: false }));
    }
  };

  return (
     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Add Gallery Images</h2>
        <p className="text-gray-600 mt-2">Enhance your portfolio with nested images</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Gallery Selection */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <span className="text-blue-600">*</span> Select Main Gallery
          </label>
          <select
            value={selectedMainId}
            onChange={(e) => setSelectedMainId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
          >
            <option value="">Choose a main gallery item...</option>
            {mainImages.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload Section */}
        <div className="bg-gray-50 p-6 rounded-xl space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              <span className="text-blue-600">*</span> Add Nested Images
            </h3>
            
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full group flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-all"
                disabled={pendingItems.length >= 10}
              >
                <svg 
                  className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span className="text-gray-600 group-hover:text-blue-600">
                  {currentFile ? "Image Selected" : "Click to Upload Image"}
                </span>
                <span className="text-sm text-gray-400 mt-1">
                  JPEG, PNG (Max 10 images)
                </span>
              </button>
            </div>

            {currentPreview && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
                <div className="flex gap-6">
                  <div className="flex-1">
                    <img
                      src={currentPreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter title..."
                        value={currentDetails.title}
                        onChange={(e) => setCurrentDetails({ ...currentDetails, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category Label
                      </label>
                      <input
                        type="text"
                        placeholder="INTERIOR, EXTERIOR, etc."
                        value={currentDetails.label}
                        onChange={(e) => setCurrentDetails({ ...currentDetails, label: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Add detailed description..."
                    value={currentDetails.description}
                    onChange={(e) => setCurrentDetails({ ...currentDetails, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    rows="3"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {10 - pendingItems.length} slots remaining
                  </span>
                  <button
                    type="button"
                    onClick={handleAddToList}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    disabled={pendingItems.length >= 10}
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add to List
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pending Images Section */}
        {pendingItems.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Selected Images ({pendingItems.length}/10)
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {pendingItems.map((item) => (
                <div 
                  key={item.id}
                  className="group relative bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => removePendingItem(item.id)}
                    className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="flex gap-4">
                    <img
                      src={item.preview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">
                        {item.details.title || "Untitled Image"}
                      </h4>
                      <div className="mt-2 space-y-1">
                        {item.details.label && (
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {item.details.label}
                          </span>
                        )}
                        {item.details.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {item.details.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Section */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              {error && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg">
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading.uploading || !selectedMainId || pendingItems.length === 0}
              className="w-full sm:w-auto flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.uploading ? (
                <>
                  <svg 
                    className="animate-spin w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Upload All ({pendingItems.length})
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default AddNestedImages;