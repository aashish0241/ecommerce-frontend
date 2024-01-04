import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      setLoading(true);
      // Send a DELETE request to the API endpoint with the order ID
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/${orderId}`, {
        method: 'DELETE',
      });

      // Update the orders state after successful deletion
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex p-0 m-0">
        <Sidebar />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Customer Name</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Payment From</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}
              >
                <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                  {order.name}
                </td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">{order.message}</td>
                <td className="px-6 py-4">{`${order.contact}`}</td>
                <td className="px-6 py-4">{`${order.payment}`}</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
