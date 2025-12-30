import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="flex mt-20 px-6 gap-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          {/* Your question / quiz content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Home;
