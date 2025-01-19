"use client";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
    <div className="max-w-lg w-full  bg-gradient-to-b from-gray-900 to-black shadow-lg rounded-xl p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-400">We'd love to hear from you! Please fill out the form below.</p>
      </div>
      <form
        action="https://formspree.io/f/xannazwk"
        method="POST"
        className="space-y-6 mt-8"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-lg text-sm bg-gray-700 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="Enter your name"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-lg text-sm bg-gray-700 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="Enter your email"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message
          </label>
          <textarea
            name="message"
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-lg text-sm bg-gray-700 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="Enter your message"
            rows="4"
          ></textarea>
        </div>
  
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          Submit Form
        </button>
      </form>
    </div>
  </div>
  
  );
}
