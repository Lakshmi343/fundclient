import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle } from "lucide-react";
const PaymentSuccess = (): JSX.Element => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const checkPayment = async (sessionId: string) => {
  //     try {
  //       const res = await fetch(
  //         `http://localhost:5000/api/create-checkout-session/paymentStatusCheck?sessionId=${sessionId}`
  //       );

  //       if (!res.ok) throw new Error("Failed to fetch payment status");

  //       const data = await res.json();
  //       console.log("Payment Status Data:", data);
  //     } catch (error) {
  //       console.error("Error checking payment status:", error);
  //     }
  //   };

  //   // Replace this with a real Stripe session ID like cs_test_...
  //   checkPayment(
  //     "cs_test_a1etTYTxy3AyVCzKm1f2yzOJn0lFbRPUhdtryfVAlrY9KbotxC162Rcb6j"
  //   );
  // }, []);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/create-checkout-session/paymentStatusCheck?sessionId=${id}`
        );
        setPaymentDetails(response.data);
      } catch (err) {
        console.error("Error fetching payment details:", err);
        setError("Failed to retrieve payment information.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPaymentDetails();
    } else {
      setLoading(false);
      setError("Missing session ID.");
    }
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <CheckCircle size={64} className="text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 mb-6">Thank you for your payment.</p>

      {paymentDetails && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-fit text-left">
          <p>
            <strong>Amount:</strong> $
            {(paymentDetails.amountTotal / 100).toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {paymentDetails.paymentStatus}
          </p>
          <p>
            <strong>Email:</strong> {paymentDetails.customerEmail}
          </p>
          <p>
            <strong>Session ID:</strong> {paymentDetails.sessionId}
          </p>
        </div>
      )}

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
