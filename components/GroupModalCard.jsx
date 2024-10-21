
export default function GroupModalCard(group) {
    const handleClick = () => {
        return
    }
  return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4 text-center">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{group.name}</h2>
        <div className="mt-4">
          <button type="button" onClick={handleClick}className="transition-all bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-3">+</button>
        </div>
      </div>
  )
}
