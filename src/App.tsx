import { ThemeProvider } from "./context/ThemeContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorDot from "./components/CursorDot";
import ScrollProgressBar from "./components/ScrollProgressBar";
import CubeBackdrop from "./components/CubeBackdrop";

function App() {
  return (
    <ThemeProvider>
      <CubeBackdrop />
      <div className="grain" />
      <ScrollProgressBar />
      <CursorDot />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
