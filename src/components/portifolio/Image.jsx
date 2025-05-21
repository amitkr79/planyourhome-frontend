import './image.css';

function Images({ data, onClick }) {
  const handleClickImage = (index) => {
    onClick(index);
  };

  return (
    <div className="images-container">
      {data.map((slide, index) => (
        <div 
          onClick={() => handleClickImage(index)} 
          key={slide._id} 
          className="image"
        >
          <img 
            src={slide.url} 
            alt={slide.description || slide.title} 
            loading="lazy"
          />
          <div className="image-title">{slide.title}</div>
          <div className="image-label">{slide.label}</div>
        </div>
      ))}
    </div>
  );
}

export default Images;

























// import './image.css'
// function Images({ data, onClick }) {
//   const handleClickImage = (index) => {
//     onClick(index);
//   };

//   return (
//     <div className="images-container">
//       {data.map((slide, index) => (
//         <div onClick={() => handleClickImage(index)} key={index} className="image">
//           <img src={slide.src} alt={slide.description} />
//           <div className="image-title">{slide.title}</div>
//           <div className="image-label">
//             3D {index % 2 === 0 ? 'INTERIOR' : 'EXTERIOR'} VIEW
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default Images;
