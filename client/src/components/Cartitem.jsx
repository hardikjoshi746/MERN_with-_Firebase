import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  decrementQuantity,
  deleteItem,
  increamentQuantity,
} from "../redux/bazarSlice";

const CartItem = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const dispatch = useDispatch();

  return (
    <div className="w-full md:pr-14 h-full flex flex-col gap-4">
      <h2 className="text-xl text-gray-700 font-titleFont border-b-2 pb-4">
        Your Shopping Cart
      </h2>
      {productData.length > 0 ? (
        productData.map((product) => (
          <div className="border-b-2 pb-4 flex gap-4 p-1" key={product._id}>
            {/* Product Image */}
            <figure className="w-32 md:w-40">
              <img
                src={product.image}
                alt="productImg"
                className="max-w-full block rounded-md object-cover"
              />
            </figure>

            {/* Product Details */}
            <div className="flex flex-col w-1/2 gap-4 py-3 text-gray-700">
              <h2 className="text-lg md:text-2xl">{product.title}</h2>
              <p className="md:text-lg">${product.price * product.quantity}</p>

              {/* Quantity Controller */}
              <div className="flex gap-3 border w-fit items-center py-1 px-2">
                <button
                  onClick={() =>
                    dispatch(
                      decrementQuantity({
                        _id: product._id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: 1,
                        description: product.description,
                      })
                    )
                  }
                  className="border h-5 w-5 flex items-center justify-center text-lg font-normal"
                >
                  -
                </button>
                <span className="text-sm">{product.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      increamentQuantity({
                        _id: product._id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: 1,
                        description: product.description,
                      })
                    )
                  }
                  className="border h-5 w-5 flex items-center justify-center text-lg font-normal"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => {
                  dispatch(deleteItem(product._id));
                  toast.error(`${product.title} is removed`);
                }}
                className="bg-red-500 text-white py-2 mt-2 w-20 text-center rounded-md border border-red-500 hover:bg-white hover:text-red-500 transition duration-300"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="h-full w-full">
          {/* Empty Cart */}
          <Link to="/">
            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition">
              <HiOutlineArrowLeft />
              Go shopping
            </button>
          </Link>
          <p className="w-full h-full grid place-content-center text-gray-500 text-lg">
            Your Cart is Empty
          </p>
        </div>
      )}
      {/* Toast Notifications */}
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default CartItem;
