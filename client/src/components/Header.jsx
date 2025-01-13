import React, { useState } from "react";
import logo from "../assets/img/header-logo.svg";
import cartIcon from "../assets/img/cartLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const productData = useSelector((state) => state.bazar.product);
  const userInfo = useSelector((state) => state.bazar.userInfo);

  const handleNavigate = () => navigate("/");
  const handleNavigateCart = () => navigate("/cart");

  const NavItems = () => (
    <>
      <li className="hover:text-gray-600 transition-colors duration-300">
        <Link to="/">Home</Link>
      </li>
      {userInfo?.name && (
        <li className="text-blue-600 font-medium">{userInfo.name}</li>
      )}
      <li>
        <Link to="/login">
          <AiOutlineUser className="w-6 h-6 border border-black rounded-full" />
        </Link>
      </li>
      <li className="relative" onClick={handleNavigateCart}>
        <img
          src={cartIcon}
          alt="cart"
          className="w-7 h-7 hover:opacity-75 cursor-pointer"
        />
        {productData.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {productData.length}
          </span>
        )}
      </li>
    </>
  );

  return (
    <header className="fixed w-full z-10 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <figure className="w-36 sm:w-44">
            <img
              onClick={handleNavigate}
              src={logo}
              alt="logo"
              className="w-full cursor-pointer"
            />
          </figure>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <NavItems />
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle menu"
          >
            <HiOutlineMenuAlt3 className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menu && (
        <nav className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <NavItems />
          </ul>
        </nav>
      )}

      {/* Toast Notifications */}
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
        newestOnTop={false}
      />
    </header>
  );
};

export default Header;
