import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppSidebar from "./Components/AppSideBar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/my-tasks" element={<div>My Tasks</div>} />
            <Route path="/members" element={<div>Members</div>} />
            <Route path="/settings" element={<div>Settings</div>} />
            <Route path="/projects/:id" element={<div>Project Detail</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;