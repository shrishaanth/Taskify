import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
import MyTasksPage from "./Pages/MyTasksPage";
import NotFound from "./Pages/NotFound";
import Members from "./Pages/Members";
import Project from "./Pages/Project";
import Settings from "./Pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/my-tasks" element={<MyTasksPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/members" element={<Members />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
