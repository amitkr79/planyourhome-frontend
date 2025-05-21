import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxrsRF7Z7gl_VhNZ3T0Rs--PK0-RaNrGnwRaPfWHtymKadyB-WXa7UzdzhgIl6zn0am/exec",
        {
          method: "POST",
          mode: "no-cors", // Must stay 'no-cors' for Google Script
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "text/plain", // required by Google Apps Script
          },
        }
      );

      // Assume success since no-cors doesn't return a readable response
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="pt-10 pb-8">
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && (
        <div className="mb-4 text-green-500">Submitted successfully!</div>
      )}

      <div className="flex-col gap-4 flex-align-center sm:flex-row">
        <div className="flex-1 w-full">
          <p>First Name</p>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full input"
            placeholder="First Name.."
            required
          />
        </div>
        <div className="flex-1 w-full">
          <p>Last Name</p>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full input"
            placeholder="Last Name.."
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <p>Email Address</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full input"
          placeholder="Email Address.."
          required
        />
      </div>

      <div className="mt-4">
        <p>Message</p>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full input"
          placeholder="Message.."
          required
        ></textarea>
      </div>

      <div className="mt-4 flex-center-center">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
