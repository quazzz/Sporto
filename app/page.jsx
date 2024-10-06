import Link from 'next/link'
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-custom-lines ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       
        <h1 className="font-[family-name:var(--font-geist-mono)] text-center mx-auto text-4xl font-bold" >Your complete platform for workouts</h1>
        <ol className="list-inside list-decimal text-lg text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 list-none text-center">
          Sporto provides workout exercise management with AI intergration
          </li>
          <div className="mt-32">
          <li className="mx-auto list-none text-center">Start by <Link href='/register'><span className=" p-3 bg-black text-white rounded-full hover:underline">registering</span></Link></li>
          <li className="mx-auto list-none text-center text-sm mt-5">or</li>
          <li className="mx-auto list-none text-center mt-5">Logging in to your <Link href='/login'><span className="p-3 bg-black text-white rounded-full hover:underline">account</span></Link></li>
          </div>
        </ol>
      </main>
    </div>
  );
}
