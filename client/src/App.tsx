import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
import MyTasksPage from "./Pages/MyTasksPage";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/my-tasks" element={<MyTasksPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
