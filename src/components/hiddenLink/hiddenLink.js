import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return isUserLoggedIn ? children : null;
};

export const ShowOnLogout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return isUserLoggedIn ? null : children;
};

// Example usage:
// const SomeComponent = () => {
//   return (
//     <div>
//       <ShowOnLogin>{/* Render content when logged in */}</ShowOnLogin>
//       <ShowOnLogout>{/* Render content when logged out */}</ShowOnLogout>
//     </div>
//   );
// };
