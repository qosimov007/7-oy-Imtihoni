import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import OrderConfirmationModal from "../components/cart/OrderConfirmationModal";
import { motion } from "framer-motion";

const Backdrop = ({ onClick }) => (
  <motion.div
    className="fixed inset-0 bg-black opacity-40 z-40"
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    exit={{ opacity: 0 }}
  />
);

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showOrderConfirmationModal, setShowOrderConfirmationModal] =
    useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [paymentMethod, setPaymentMethod] = useState("eMoney");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const totalPrice = cartItems.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0
  );

  const VAT = Math.floor((totalPrice / 100) * 20);

  const grandTotal = totalPrice + 50;

  const onSubmit = () => {
    setShowOrderConfirmationModal(true);
  };

  return (
    <div className="bg-paleGray mb-50 pb-24">
      {showOrderConfirmationModal && (
        <Backdrop
          onClick={() => setShowOrderConfirmationModal(false)}
          showBlur={true}
        />
      )}
      <div className="container mx-auto pt-24 md:pt-8 mb-96 lg:pt-20 lg:mb-45 md:max-w-[689px] lg:max-w-[1210px] opacity-50">
        <a
          className=" cursor-pointer text-body hover:underline"
          onClick={() => navigate(-1)}
        >
          Go Back
        </a>
      </div>

     
      {showOrderConfirmationModal && (
        <>
          <Backdrop />
          <OrderConfirmationModal cartItems={cartItems} />
        </> 
      )}
    </div>
  );
};
export default Checkout;
