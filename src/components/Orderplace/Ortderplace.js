import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Switch } from '@headlessui/react';



export default function Orderplace() {
  
  const [postData, setPostData] = useState({
    name: '',
    message: '',
    contact: '', // Default phone value
    payment: '',
    address: '', // Default address value
  });

  const handlePostRequest = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
      toast.success('Order placed successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to place the order');
    }
  };

  return (
    <div className=" cursor-pointer isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Buying Confirmation</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Please fill the form correctly. It will help us deliver on time.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
              Name:
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                value={postData.name}
                onChange={(e) => setPostData({ ...postData, name: e.target.value })}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message:
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="message"
                value={postData.message}
                onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                autoComplete="message"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
              Phone number:
            </label>
            <div className="sm:col-span-2">
  <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">

  </label>
  <div className="mt-2.5">
    <input
      type="number"
      name="phone"
      value={postData.contact}
      onChange={(e) => setPostData({ ...postData, contact: e.target.value })} 
      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
</div>

          </div>
          <div className="sm:col-span-2">
            <label htmlFor="payment" className="block text-sm font-semibold leading-6 text-gray-900">
              Payment:
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="payment"
                value={postData.payment}
                onChange={(e) => setPostData({ ...postData, payment: e.target.value })}
                autoComplete="payment"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
              Address:
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="address"
                value={postData.address}
                onChange={(e) => setPostData({ ...postData, address: e.target.value })}
                autoComplete="address"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
          {/* ... (existing Switch.Group content) */}
        </Switch.Group>
        <div className="mt-10">
          <button
            type="button"
            onClick={handlePostRequest}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            confirm Order
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
