import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "917909050141";
  const message = "Hello! I have a question about your services.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-16 right-0 mr-4 z-50 flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white shadow-md hover:bg-[#128C7E] transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-xl text-white" />
      <span className="absolute right-12 bg-white text-gray-800 text-sm font-medium px-2 py-1 rounded-md shadow-md opacity-1 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;