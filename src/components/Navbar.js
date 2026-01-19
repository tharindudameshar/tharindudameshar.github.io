export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Your Name</h1>
      <div>
        <a href="#projects">Projects</a>
        <a href="#publications">Publications</a>
        <a href="/cv.pdf">CV</a>
      </div>
    </nav>
  );
}