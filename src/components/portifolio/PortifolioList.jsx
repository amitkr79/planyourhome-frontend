import { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Captions, Fullscreen, Zoom } from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Images from './Image.jsx';
import axios from 'axios';

function Portfolio() {
  const [index, setIndex] = useState(-1);
  const [activeSlides, setActiveSlides] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gallery data from backend
  useEffect(() => {
    // console.log(process.env.API_BASE_URL)
    const fetchGalleryData = async () => {
      try {
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/gallery`);
        const response = await axios.get('https://planyourhome-backend.onrender.com/api/gallery');
        setGalleryData(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching gallery data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const handleImageClick = (clickedIndex) => {
    const selected = galleryData[clickedIndex];
    // Format nested slides for lightbox
    const formattedSlides = selected.nestedSlides.map(slide => ({
      src: slide.url,
      title: slide.title,
      description: slide.description,
      alt: slide.label
    }));
    setActiveSlides(formattedSlides);
    setIndex(0); // Start from first nested image
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading gallery: {error}
      </div>
    );
  }

  return (
    <>
      <Images data={galleryData} onClick={handleImageClick} />
      <Lightbox
        plugins={[Captions, Fullscreen, Zoom]}
        captions={{
          showToggle: true,
          descriptionTextAlign: 'end',
        }}
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={activeSlides}
      />
    </>
  );
}

export default Portfolio;