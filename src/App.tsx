import "./App.css"
import { Index } from "./pages";
import { NotFound } from "./pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
