export default function notfound() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] justify-items-center min-h-screen  text-white p-8 sm:p-20 gap-6">
      <h1 className="font-[family-name:var(--font-geist-mono)] text-6xl sm:text-8xl font-bold animate-pulse">
        404
      </h1>
      <h2 className="font-[family-name:var(--font-geist-mono)] text-2xl sm:text-3xl text-center max-w-lg animate-pulse">
        The page you were looking for doesn’t exist.
      </h2>
    </div>
  );
}
