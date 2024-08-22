import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { EmailDetails } from "./pages/EmailDetails";
import { EmailIndex } from "./pages/EmailIndex";
import { AppHeader } from "./cmps/AppHeader";
import { EmailCompose } from "./cmps/EmailCompose";

export function App() {
  return (
    <Router>
      <AppHeader />
      <main className="main-layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/email" element={<EmailIndex />}>
            <Route path=":mailId" element={<EmailDetails />} />
          </Route>
          <Route path="/email/compose" element={<EmailCompose />} />
        </Routes>
      </main>
    </Router>
  );
}
