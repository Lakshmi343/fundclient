import React from "react";
import { XCircle } from "lucide-react";

const PaymentFailure = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <XCircle size={64} className="text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Failed</h1>
      <p className="text-lg text-gray-700 mb-6">
        Unfortunately, your payment could not be processed.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-fit text-left">
        <p className="text-gray-800">
          <strong>Reason:</strong> Your transaction was declined or canceled.
        </p>
        <p className="text-gray-800">
          <strong>Next Step:</strong> Please try again or contact support if the
          issue persists.
        </p>
      </div>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentFailure;
