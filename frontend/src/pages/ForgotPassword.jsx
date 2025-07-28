import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = `
      mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors {
            message
          }
        }
      }
    `;

    try {
      const res = await fetch("https://q3uepe-ic.myshopify.com/api/2023-07/graphql.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": "76df5b05e1b2db908234960f1757df67",
        },
        body: JSON.stringify({ query, variables: { email } }),
      });

      const json = await res.json();
      const error = json?.data?.customerRecover?.customerUserErrors?.[0]?.message;

      if (error) {
        alert(error);
      } else {
        alert("Password reset email sent");
        setSent(true);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-4  rounded shadow">
        <h2 className="mb-4 text-[20px] font-semibold text-[#A9ABAE]">Forgot Password</h2>
        {sent ? (
          <p className="text-[#A9ABAE] text-[10px]">Check your email for a reset link.</p>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full bg-transparent border-b text-[#A9ABAE] placeholder-[#A9ABAE] py-2 text-sm outline-none mb-3"
            />
            <button type="submit" className="w-full text-[#A9ABAE] bg-[#605B55] hover:bg-[#534f49] text-sm py-2 rounded-full tracking-wide">
              Send Reset Link
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
