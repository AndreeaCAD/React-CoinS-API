import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";
import FourZeroFour from "./pages/fourZeroFour";

function App() {
  return (
    <Router>
      {/* Header */}
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="*" element={<FourZeroFour />}></Route>{" "}
        {/* pentru a afisa o eroare 404 atunci ca selectam orice altceva in afara de cele 2  */}
      </Routes>

      {/* Footer - elemente care raman constant pe pagina */}
    </Router>
  );
}

export default App;
