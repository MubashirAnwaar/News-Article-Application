import Home from "./pages/Home";
import SignInForm from "./auth/forms/SignInForm";
import SignUpForm from "./auth/forms/SignUpForm";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NewsArticle from "./pages/NewsArticle";
import Header from "./components/shared/Header";
import { Toaster } from "./components/ui/sonner";
import Footer from "./components/shared/Footer";


function App() {
  return (
    <BrowserRouter>
    <Header />
        <Routes>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/news" element={<NewsArticle />} />
        </Routes>

        <Footer />
        <Toaster />
    </BrowserRouter>
  );
}

export default App;
