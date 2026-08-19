import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Publications from "./components/Publications";
import Personal from "./components/Personal";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Publications />
      <Personal />
    </>
  );
}