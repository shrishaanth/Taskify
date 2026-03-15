import AppSidebar from "../Components/AppSideBar";
import Home from "../Components/Home";

const Index = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto w-full max-w-7xl">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Home</h1>
            <p className="mt-1 text-sm text-gray-600">
              Overview of all tasks across projects
            </p>
          </header>
          <Home />
        </div>
      </main>
    </div>
  );
};

export default Index;
