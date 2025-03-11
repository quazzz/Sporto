"use client";
function LoadingPage() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center py-12 animate-gradient bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] ">
      <div className="text-center space-y-6 animate-opacity">
        <h1 className="text-2xl font-semibold z-100">Give us a second</h1>
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-t-emerald-500 border-gray-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 text-sm">Loading, please hold tight...</p>
      </div>
    </div>
  );
}
export default LoadingPage;
