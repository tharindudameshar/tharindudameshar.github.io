export default function Personal() {
  const playUrl = `${process.env.PUBLIC_URL || ""}/lifeboat/index.html`;

  return (
    <section id="personal">
      <h2>Personal</h2>
      <p className="section-lead">Things that are not the lab.</p>

      <article className="card lifeboat-card">
        <p className="phrase-kicker">Simulation</p>
        <h3>Lifeboat</h3>
        <p className="phrase">Change the past. Come home to a different now.</p>
        <p>
          A Timeless-style hour machine. Jump to ten famous moments — Caesar,
          1776, the iceberg, Dallas, the Wall. Protect history or break it.
          Newspapers, maps, and who still has a chair rewrite when you extract.
          Skip an hour and someone else takes it.
        </p>
        <div className="lifeboat-frame">
          <iframe
            title="Lifeboat — change the past, come home to a different now"
            src={playUrl}
            allow="autoplay"
          />
        </div>
        <p className="lifeboat-hint">
          Play in the page. ⌘1 briefing · ⌘2 hours · ⌘3 log ·{" "}
          <a href={playUrl}>open full screen</a>
        </p>
      </article>
    </section>
  );
}
