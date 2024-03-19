import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [cart, setCart] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
      const productsData = await response.json();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    // const newCart = cart + 1;
    // setCart(newCart);
    // localStorage.setItem("cart", newCart.toString());
    // console.log(
    //   `Added ${product.name} to the cart. Total items in cart: ${newCart}`
    // );

    toast.success("items aded to cart sucessfully");
  };

  const showDescription = (product) => {
    setSelectedProduct(product);
  };

  const hideDescription = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex w-full flex-wrap">
      {products.map((product) => (
        <div
          key={product.sku}
          className="w-[290px] rounded overflow-hidden shadow-lg m-4"
        >
          <img
            className="w-[250px] h-[125px] cursor-pointer"
            src={product.image}
            width="70px"
            height="60px"
            alt={product.name}
            onClick={() => showDescription(product)}
          />
          <div className="px-6 py-4">
            <div
              className="font-bold text-xl mb-2 cursor-pointer"
              onClick={() => showDescription(product)}
            >
              {product.name}
            </div>
            <p className="text-gray-700 text-base cursor-pointer">
              SKU: {product.sku} | Category: {product.category}
            </p>
            <p
              className="text-gray-700 text-base cursor-pointer"
              onClick={() => showDescription(product)}
            >
              Quantity: {product.quantity}
            </p>
            <p
              className="text-gray-700 text-base cursor-pointer"
              onClick={() => showDescription(product)}
            >
              Price: ${product.price}
            </p>
          </div>
          <div className="px-6 py-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Regular Price: ${product.regularPrice}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Color: {product.color}
            </span>
          </div>
          {selectedProduct && selectedProduct.sku === product.sku && (
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base">{product.description}</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={hideDescription}
              >
                Hide Description
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
