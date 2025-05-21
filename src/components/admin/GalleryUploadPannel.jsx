import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GalleryUploadPanel = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [currentNestedImage, setCurrentNestedImage] = useState(null);
  const [currentNestedPreview, setCurrentNestedPreview] = useState('');
  const [nestedItems, setNestedItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    label: '',
    currentNested: { title: '', description: '', label: '' }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const nestedFileInputRef = useRef(null);

  // Handle main form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle current nested slide input changes
  const handleCurrentNestedChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      currentNested: {
        ...prev.currentNested,
        [name]: value
      }
    }));
  };

  // Handle main image selection
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle current nested image selection
  const handleCurrentNestedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentNestedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentNestedPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add current nested item to the gallery
  const addNestedItem = () => {
    if (!currentNestedImage) {
      setError('Please select an image');
      return;
    }
    
    setError('');
    const newItem = {
      image: currentNestedImage,
      preview: currentNestedPreview,
      title: formData.currentNested.title,
      description: formData.currentNested.description,
      label: formData.currentNested.label
    };
    
    setNestedItems([...nestedItems, newItem]);
    
    // Reset current nested fields
    setCurrentNestedImage(null);
    setCurrentNestedPreview('');
    setFormData(prev => ({
      ...prev,
      currentNested: { title: '', description: '', label: '' }
    }));
    
    // Clear file input
    if (nestedFileInputRef.current) {
      nestedFileInputRef.current.value = '';
    }
  };

  // Remove nested item
  const removeNestedItem = (index) => {
    setNestedItems(nestedItems.filter((_, i) => i !== index));
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      
      // Append main data
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('label', formData.label);
      
      // Append main image
      if (mainImage) {
        formDataToSend.append('mainImage', mainImage);
      }
      
      // Append nested images and details
      nestedItems.forEach((item, index) => {
        formDataToSend.append('nestedImages', item.image);
      });
      
      // Append nested details as JSON
      formDataToSend.append('nestedDetails', JSON.stringify(
        nestedItems.map(item => ({
          title: item.title,
          description: item.description,
          label: item.label
        }))
      ));

      // Send to backend
      const response = await axios.post('https://planyourhome-backend.onrender.com/api/gallery', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        navigate('/portifolio'); // Redirect after success
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload gallery item');
    } finally {
      setLoading(false);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const triggerNestedFileInput = () => {
    nestedFileInputRef.current.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Upload Gallery Item</h1>
      
      {/* Progress Steps */}
      <div className="flex mb-8">
        <div 
          className={`flex-1 text-center py-2 border-b-2 ${step >= 1 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'}`}
          onClick={() => setStep(1)}
        >
          Main Slide
        </div>
        <div 
          className={`flex-1 text-center py-2 border-b-2 ${step >= 2 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'}`}
          onClick={() => setStep(2)}
        >
          Add Nested Items
        </div>
        <div 
          className={`flex-1 text-center py-2 border-b-2 ${step >= 3 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'}`}
          onClick={() => setStep(3)}
        >
          Review & Submit
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Main Slide */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Main Slide Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label*</label>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Image*</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleMainImageChange}
                accept="image/*"
                className="hidden"
                required
              />
              <div 
                onClick={triggerFileInput}
                className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition"
              >
                {mainImagePreview ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={mainImagePreview} 
                      alt="Preview" 
                      className="h-40 object-contain mb-2"
                    />
                    <span className="text-sm text-blue-500">Click to change image</span>
                  </div>
                ) : (
                  <div className="py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">Click to upload main image</p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.title || !formData.label || !mainImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
              >
                Next: Add Nested Items
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Add Nested Items */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Add Nested Items</h2>
            <p className="text-sm text-gray-500">Add one nested item at a time</p>
            
            <div className="border border-gray-200 rounded-md p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nested Image*</label>
                  <input
                    type="file"
                    ref={nestedFileInputRef}
                    onChange={handleCurrentNestedImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div 
                    onClick={triggerNestedFileInput}
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition"
                  >
                    {currentNestedPreview ? (
                      <div className="flex flex-col items-center">
                        <img 
                          src={currentNestedPreview} 
                          alt="Preview" 
                          className="h-40 object-contain mb-2"
                        />
                        <span className="text-sm text-blue-500">Click to change image</span>
                      </div>
                    ) : (
                      <div className="py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">Click to upload nested image</p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.currentNested.title}
                    onChange={handleCurrentNestedChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.currentNested.description}
                    onChange={handleCurrentNestedChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    name="label"
                    value={formData.currentNested.label}
                    onChange={handleCurrentNestedChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter label"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addNestedItem}
                    disabled={!currentNestedPreview}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-300"
                  >
                    Add to Gallery
                  </button>
                </div>
              </div>
            </div>
            
            {/* Display added nested items */}
            {nestedItems.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Added Nested Items ({nestedItems.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nestedItems.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4 relative">
                      <button
                        onClick={() => removeNestedItem(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <img 
                            src={item.preview} 
                            alt={`Nested item ${index}`} 
                            className="h-20 w-20 object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{item.title || 'Untitled'}</h4>
                          <p className="text-sm text-gray-500">{item.label}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={nestedItems.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
              >
                Next: Review & Submit
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Review Your Submission</h2>
            
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Main Slide</h3>
              
              <div className="flex flex-col md:flex-row gap-6">
                {mainImagePreview && (
                  <div className="md:w-1/3">
                    <img 
                      src={mainImagePreview} 
                      alt="Main slide preview" 
                      className="w-full h-48 object-contain rounded-md"
                    />
                  </div>
                )}
                
                <div className="md:w-2/3 space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Title:</span>
                    <p className="text-gray-800">{formData.title}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Label:</span>
                    <p className="text-gray-800">{formData.label}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Description:</span>
                    <p className="text-gray-800 whitespace-pre-line">{formData.description || 'No description'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {nestedItems.length > 0 && (
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Nested Items ({nestedItems.length})</h3>
                
                <div className="space-y-4">
                  {nestedItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <img 
                            src={item.preview} 
                            alt={`Nested item ${index}`} 
                            className="w-full h-32 object-contain rounded-md"
                          />
                        </div>
                        
                        <div className="md:w-2/3 space-y-2">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Title:</span>
                            <p className="text-gray-800">{item.title || 'No title'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Label:</span>
                            <p className="text-gray-800">{item.label || 'No label'}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Description:</span>
                            <p className="text-gray-800 whitespace-pre-line">
                              {item.description || 'No description'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Submit Gallery'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default GalleryUploadPanel;