"use client";
function LoadingPage() {
  return (
    <div className="min-h-screen text-white flex flex-start justify-center  ">
      
      <div className="text-center space-y-6 animate-opacity">
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-t-emerald-500 border-gray-600 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
export default LoadingPage;
