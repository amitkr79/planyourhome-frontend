import { useState } from "react";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxrsRF7Z7gl_VhNZ3T0Rs--PK0-RaNrGnwRaPfWHtymKadyB-WXa7UzdzhgIl6zn0am/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(formData),
        }
      );

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-10 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-full w-full flex-1 basis-[18rem]">
          <img
            src="/images/property (39).jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 basis-[18rem] bg-secondary py-6 !text-slate-200">
          <div className="max-w-[350px] w-full mx-auto bg-[#0a5076] p-4 rounded-lg">
            <h1 className="text-lg font-semibold">Get in touch</h1>
            <p>
              For more inquiries or deals, just contact us using the form below,
              we will contact you back!
            </p>

            {success && (
              <p className="text-green-400 mt-3">Message sent successfully!</p>
            )}
            {error && <p className="text-red-400 mt-3">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-2 py-1 border-none rounded-md outline-none bg-secondary"
                placeholder="Your name.."
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-1 mt-3 border-none rounded-md outline-none bg-secondary"
                placeholder="Your email.."
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 mt-3 border-none rounded-md outline-none bg-secondary"
                rows={3}
                placeholder="Your message.."
                required
              ></textarea>
              <button
                type="submit"
                className="w-full mt-4 btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
