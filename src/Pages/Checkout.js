import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import util from "../config/util";
import service from "../service/cart";
import order from "../service/order";
import { toast, Toaster } from "react-hot-toast";
const Checkout1 = () => {
  const availableTables = [1, 2, 3, 4, 5, 6, 7];
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const [tableno, setTableNo] = useState();
  const [cartData, setCartData] = useState([]);
  const [data, setData] = useState({ user_id: util.getUserId() });

  const handleChange = (value) => {
    setData({ ...data, ...value });
  };
  const list = () => {
    service
      .list({}, { user_id: util.getUserId() })
      .then((res) => setCartData(res.data))
      .catch((err) => util.failed(err.message));
  };

  const handleOrder = async () => {
      if (data.table_no !== undefined && data.table_no !== "") {
          const callFunction = order.save(data);
          const od = await callFunction
      toast.promise(callFunction, {
        loading: "Processing Payment",
        error: "error occurs in data",
        success: navigate("/success?orderId="+od.data.order_id),
        
      });
      console.log()
    } else {
      util.failed("Please fill the checkout form.");
    }
  };
  useEffect(() => {
    list();
  }, []);
  const changeText = (e) => {
    setMenu(false);
    setTableNo(e.target.textContent);
    handleChange({ table_no: e.target.textContent });
  };

  return (
    <div className="flex justify-center items-center p-6">
      <Toaster />
      <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
        <div className="flex flex-col justify-start items-start w-full space-y-9">
          <div className="flex justify-start flex-col items-start space-y-2">
            <button className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
              <svg
                className="fill-stroke"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.91681 7H11.0835"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91681 7L5.25014 9.33333"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91681 7.00002L5.25014 4.66669"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link to={"/"} className="text-sm leading-none">
                Back
              </Link>
            </button>
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Checkout
            </p>
          </div>

          <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
            <div className="my-8 w-full">
              <div className="mx-auto p-4 rounded-lg">
                {cartData.length !== 0 &&
                  cartData?.items.map((item, idx) => (
                    <div className=" bg-gray-200  mx-auto rounded-lg p-4 flex justify-between items-center my-4">
                      <div className="flex flex-wrap items-center flex-row ">
                        <img
                          src={item?.img}
                          alt="cart-item"
                          className="h-20 mr-8"
                        />
                        <p className="text-md md:text-lg mt-3">{`${idx + 1}. ${
                          item?.name
                        }  : ₹${item?.price}`}</p>
                      </div>
                      <div className="flex justify-center">
                        <button className="bg-[#FF5432] text-white px-2 rounded-sm">
                          +
                        </button>
                        <span className="px-2 py-1">{item?.quantity}</span>
                        <button className="bg-[#FF5432] text-white px-2 rounded-sm">
                          -
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
              <button className="border border-transparent hover:border-gray-300 bg-[#FF5432] hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
                <div>
                  <svg
                    className="fill-current"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9099 4.27692C9.6499 4.27692 9.1174 4.87817 8.2399 4.87817C7.34021 4.87817 6.65396 4.28129 5.56208 4.28129C4.49333 4.28129 3.35365 4.93379 2.6299 6.04535C1.61365 7.61285 1.78615 10.565 3.43208 13.08C4.02083 13.9804 4.80708 14.99 5.83833 15.001H5.85708C6.75333 15.001 7.01958 14.4141 8.25302 14.4072H8.27177C9.48677 14.4072 9.73052 14.9975 10.623 14.9975H10.6418C11.673 14.9866 12.5015 13.8679 13.0902 12.971C13.514 12.326 13.6715 12.0022 13.9965 11.2725C11.6155 10.3688 11.233 6.99348 13.5877 5.69942C12.869 4.79942 11.859 4.27817 10.9068 4.27817L10.9099 4.27692Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10.6338 1C9.88379 1.05094 9.00879 1.52844 8.49629 2.15188C8.03129 2.71688 7.64879 3.555 7.79879 4.36781H7.85879C8.65754 4.36781 9.47504 3.88688 9.95254 3.27063C10.4125 2.68406 10.7613 1.85281 10.6338 1V1Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-base leading-4">Pay</p>
                </div>
              </button>

              <div className="flex flex-row justify-center items-center mt-6">
                <hr className="border w-full" />
                <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">
                  or pay with card
                </p>
                <hr className="border w-full" />
              </div>

              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="email"
                  placeholder={util.getUserEmail()}
                  defaultValue={util.getUserEmail()}
                />
              </div>

              <label className="mt-8 text-base leading-4 text-gray-800">
                Card details
              </label>
              <div className="mt-2 flex-col">
                <div>
                  <input
                    className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="0000 1234 6549 15151"
                  />
                </div>
                <div className="flex-row flex">
                  <input
                    className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="MM/YY"
                  />
                  <input
                    className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="CVC"
                  />
                </div>
              </div>

              <label className="mt-8 text-base leading-4 text-gray-800">
                Name on card
              </label>
              <div className="mt-2 flex-col">
                <div>
                  <input
                    className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="Name on card"
                  />
                </div>
              </div>

              <label className="mt-8 text-base leading-4 text-gray-800">
                Table Number
              </label>
              <div className="mt-2 flex-col">
                <div className="relative">
                  <button
                    className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                    type="email"
                    placeholder="Choose your table number"
                  >
                    {tableno || "Choose Your Table Number"}
                  </button>
                  <svg
                    onClick={() => setMenu(!menu)}
                    className={
                      "transform  cursor-pointer absolute top-4 right-4 " +
                      (menu ? "rotate-180" : "")
                    }
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 5.75L8 10.25L12.5 5.75"
                      stroke="#27272A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    className={
                      "mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " +
                      (menu ? "block" : "hidden")
                    }
                  >
                    {availableTables.map((tableno) => (
                      <div
                        key={tableno}
                        className="cursor-pointer hover:bg-[#FF5432] hover:text-white px-4 py-2"
                        onClick={changeText}
                      >
                        {tableno}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button className="mt-8 border border-transparent hover:border-gray-300 bg-[#FF5432] hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                <div>
                  <p
                    className="text-base leading-4"
                    onClick={(e) => handleOrder()}
                  >
                    Pay ₹{cartData.total_price}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout1;
