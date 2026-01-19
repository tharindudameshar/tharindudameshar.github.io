import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Your Name
      </motion.h1>

      <p>
        PhD Researcher · Nanophotonics · Metalenses · Metasurfaces
      </p>

      <a className="button" href="/cv.pdf">Download CV</a>
    </section>
  );
}