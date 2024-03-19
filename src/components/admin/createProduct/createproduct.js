import React, { useState } from "react";

import Sidebar from "../sidebar/sidebar";

import { ToastContainer, toast } from 'react-toastify';

const CreateProduct = () => {
  const [postData, setPostData] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: 0,
    price: 0,
    description: "",
    image: "",
    regularPrice: '',
    color: "",
    brand: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you need
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        
      }

      const data = await response.json();
      // Handle the response data as needed
      console.log("Response:", data);
      toast.success("Product created sucessfully")
    } catch (error) {
      console.error("Error:", error);
      toast.error("Product creation failed");
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className=" w-full bg-gray-100 dark:bg-gray-800 transition-colors duration-300 p-2 pl-6 ml-12">
        <div className="container mx-auto p-4">
          <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
            <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 items-center">
              AddProduct Details
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Use a ginue product in this area for your grow of Business.
            </p>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="border p-2 rounded w-full"
                  name="name"
                  value={postData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Enter Your SKU"
                  name="sku"
                  value={postData.sku}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
              <label>Enter Quantity Number:</label>
                <input
                  type="number"
                  name="quantity"
                  value={postData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter Quantitiy"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                
                  <input
                    type="text"
                    name="category"
                    value={postData.category}
                    onChange={handleInputChange}
                    placeholder="Enter Your Category"
                    className="border p-2 rounded w-full"
                  />
                  {/* Add more countries as needed */}
                
              </div>
              <div className="mb-4">
                <label>Enter Price:</label>
                <input
                  type="text"
                  placeholder="Enter Regular Price"
                  className="border p-2 rounded w-full"
                  name="price" value={postData.price} onChange={handleInputChange} 
                />
              </div>
              <div className="mb-4">
                <label>Description Of Product:</label>
                <textarea
                  type="text"
                  placeholder="Enter Regular Price"
                  className="border p-2 rounded w-full"
                  name="description" value={postData.description} onChange={handleInputChange}
                  width='90%' height='120px' /> 
                
              </div>
              <div className="mb-4">
                <label>Product Brand:</label>
                <input
                  type="text"
                  placeholder="Enter Product Brand"
                  className="border p-2 rounded w-full"
                  name="brand" value={postData.brand} onChange={handleInputChange}
                   /> 
                
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <label>Enter Image url:</label>
                <input
                  type="string"
                  placeholder="enter Image Url"
                  className="border p-2 rounded w-full"
                  name="image" value={postData.image} onChange={handleInputChange} 
                />
                <input
                  type="text"
                  placeholder="Regular Price"
                  className="border p-2 rounded w-full"
                  name="regularPrice" value={postData.regularPrice} onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Enter Product Color"
                  className="border p-2 rounded w-full"
                  name="color" value={postData.color} onChange={handleInputChange} 
                />
              </div>
              <button
                type="button"
                id="theme-toggle"
                className="  w-full items-center px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
                onClick={handlePostRequest}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
