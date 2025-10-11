import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <ScrollToTop />
    </>
  );
}

export default App;
