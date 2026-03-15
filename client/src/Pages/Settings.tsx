import AppSidebar from "../Components/AppSideBar";

const Settings = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AppSidebar />

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto w-full max-w-7xl">

          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Settings
            </h1>
            <p className="text-sm text-gray-600">
              Workspace settings
            </p>
          </header>

          <div className="flex h-[400px] items-center justify-center rounded-xl border border-gray-200 bg-white">
            <p className="text-gray-500 text-sm">
              Settings page coming soon.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Settings;