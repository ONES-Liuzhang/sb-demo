import { Routes, Route, Link } from "react-router-dom";
import AliReactTablePage from "./components/ali-react-table";
import ReactWindowPage from "./components/react-window";
import "./App.css";

function App() {
  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="ali-react-table">ali-react-table</Link>
          </li>
          <li>
            <Link to="react-window">react-window</Link>
          </li>
        </ul>
      </nav>
      <main className="container">
        <Routes>
          <Route path="ali-react-table" element={<AliReactTablePage />} />
          <Route path="react-window" element={<ReactWindowPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
