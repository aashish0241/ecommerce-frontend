import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserName } from "../../pages/profile/profile";
import { RESET_AUTH, logout } from "../../redux/features/auth/authSlice";
import styles from "./header.module.scss";

const Header = () => {
  const loginuser = window.localStorage.getItem("login");
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [showmenu, setShowmenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const [userRole, setUserRole] = useState(false);

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  const [card, setCard] = useState(Number(localStorage.getItem("cart")) || 0);

  useEffect(() => {
    // Update the cart value when it changes in local storage
    setCard(Number(localStorage.getItem("cart")) || 0);
  }, []);
  useEffect(() => {
    //oiuiouiv
    updateLoginStatus();
    window.addEventListener("scroll", fixNavbar);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", fixNavbar);
    };
  }, []); // Empty dependency array ensures the effect runs only on mount and unmount

  const updateLoginStatus = () => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  };

  const toggleMenu = () => {
    setShowmenu(!showmenu);
  };

  const hideMenu = () => {
    setShowmenu(false);
  };
  const getUserRole = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/userrole`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed (e.g., authentication token)
        },
        credentials: "include", // Include this line if you're using cookies for authentication
      });

      if (!response.ok) {
        // Handle error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userData = await response.json();
      const userRole = userData.role;

      // Now you can use the userRole in your application
      console.log("User Role:", userRole);
      if (userRole === "admin") {
        setUserRole("admin");
      }
    } catch (error) {
      // Handle any errors during the fetch
      console.error("Error fetching user role:", error.message);
    }
  };
  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      console.log(role);
    };

    fetchUserRole();
  }, []);

  const logo = (
    <div className={`${styles.logo} text-3xl`}>
      <Link to="/">
        <h2>
          Shop<span>Easy.</span>
        </h2>
      </Link>
    </div>
  );

  const logoutUser = async () => {
    window.localStorage.removeItem("login");

    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/orderplace" className={activeLink}>
        <FaShoppingCart size={20} />
        <p>{card}</p>
      </Link>
    </span>
  );

  return (
    <header
      className={`header ${scrollPage ? "fixed" : ""}`}
      style={{ backgroundColor: "#1A3652" }}
    >
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showmenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showmenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li className="pt-3">
              <NavLink to="/shop">Shop</NavLink>
            </li>
            {loginuser && (
              <li className="pt-3">
                <NavLink to="/admin" className={activeLink}>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <div className={styles["header-right"]}>
            <span className={styles.links}>
              {!loginuser && (
                <>
                  <NavLink to="login" className={activeLink}>
                    Login
                  </NavLink>
                  <NavLink to="register" className={activeLink}>
                    Register
                  </NavLink>
                </>
              )}

              {loginuser && (
                <>
                  <div className="pb-5 d-flex">
                    {/* <NavLink to="/profile">
                      <FaUserCircle size={16} color="#ff7722" />
                      <UserName />
                    </NavLink> */}
                    <NavLink to="/orderplace" className={activeLink}>
                      My Order
                    </NavLink>
                    <Link to="/" onClick={logoutUser}>
                      Logout
                    </Link>
                  </div>
                </>
              )}
            </span>
            {/* <div className="pt-5">{cart}</div> */}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          <HiOutlineMenuAlt3 size={21} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
