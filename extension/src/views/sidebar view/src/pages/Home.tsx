import Card from "../components/Card";

function Home(): React.JSX.Element {
  return (
    <div className="p-2 flex flex-col items-center">
      <button className="w-[90%] p-2 ring-2 ring-gray-300 text-lg rounded hover:ring-blue-500">
        Create Post
      </button>
      <div className="divider"></div>
      {/* Post section */}
      <div className="mt-4 w-full flex flex-col items-center">
        <Card />
      </div>
    </div>
  );
}

export default Home;
