import React from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/bazarSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.bazar.userInfo);

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed Out Successfully");
        dispatch(removeUser());
      })
      .catch((err) => {
        console.error("Sign out error", err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to eBazaar
          </h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        {!userInfo ? (
          <div className="mt-8 space-y-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10c-2.726 0-5.146-1.117-6.91-2.91l2.366-1.81c.77.607 1.753.97 2.844.97 2.194 0 3.983-1.789 3.983-3.983s-1.789-3.983-3.983-3.983c-1.04 0-1.973.396-2.684 1.036l-2.491-2.491c.98-.918 2.244-1.436 3.585-1.436z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignOut}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out of eBazaar
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
