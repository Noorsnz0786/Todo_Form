import { useState } from "react";
import { FormSchema } from "../validation";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "fullName") {
      setFullName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "mobileNumber") {
      setMobileNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      fullName,
      email,
      password,
      mobileNumber,
    };

    // Retrieving THE EXISTING DATA FROM LOCAL
    let existingData = JSON.parse(localStorage.getItem("FormWithTodo"));

    if (!Array.isArray(existingData)) {
      existingData = []; // Initialize as an empty array if not already an array
    }

    // Check if email already exists
    const emailExists = existingData.find((entry) => entry.email === email);

    if (emailExists) {
      setErrors({ email: "Email already exists, please provide a new one." });
      return;
    }

    try {
      FormSchema.parse(data);
      console.log(data);
      existingData.push(data); 
      localStorage.setItem("FormWithTodo", JSON.stringify(existingData));
      alert("Form Submitted Successfully");
      setErrors({});
    } catch (err) {
      const formattedErrors = {};
      err.errors.forEach((error) => {
        formattedErrors[error.path[0]] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={title}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.title && (
          <span className="text-red-500 text-xs">{errors.title}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description:
        </label>
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          value={description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.description && (
          <span className="text-red-500 text-xs">{errors.description}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Full Name:
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          value={fullName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.fullName && (
          <span className="text-red-500 text-xs">{errors.fullName}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Mobile Number:
        </label>
        <input
          type="text"
          name="mobileNumber"
          placeholder="Enter Mobile Number"
          value={mobileNumber}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.mobileNumber && (
          <span className="text-red-500 text-xs">{errors.mobileNumber}</span>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default Todo;
