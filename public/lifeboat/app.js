(() => {
if (!window.desktop) document.body.classList.add("web");

const Engine = window.LifeboatEngine;
const Present = window.LifeboatPresent;

let state = Engine.loadState();
let selectedEvent = null;

const view = document.getElementById("view");
const teamEl = document.getElementById("team");
const helixEl = document.getElementById("helix-note");
const topStatus = document.getElementById("top-status");
const topMeta = document.getElementById("top-meta");

async function resetTimeline() {
  const ok = window.desktop?.resetTimeline
    ? await window.desktop.resetTimeline()
    : window.confirm("Erase all divergences and return to the prime timeline?");
  if (!ok) return;
  state = Engine.resetState();
  render();
}

document.getElementById("btn-reset").addEventListener("click", () => {
  resetTimeline();
});

document.addEventListener("click", (event) => {
  if (event.target.closest("button")) window.LifeboatAudio?.click();
});

window.desktop?.onMenuCommand((command) => {
  if (command === "reset") return resetTimeline();
  if (command === "briefing") return go("briefing");
  if (command === "hours") return go("missions");
  if (command === "log") return go("log");
  if (command === "title") return go("title");
});

document.addEventListener("keydown", (event) => {
  const meta = event.metaKey || event.ctrlKey;
  if (meta && event.key === "1") {
    event.preventDefault();
    go("briefing");
  }
  if (meta && event.key === "2") {
    event.preventDefault();
    go("missions");
  }
  if (meta && event.key === "3") {
    event.preventDefault();
    go("log");
  }
  if (event.key === "Escape") {
    if (state.screen === "mission" || state.screen === "missions" || state.screen === "log") {
      go("briefing");
    }
  }
});

function allMissions() {
  return [...window.LIFEBOAT_EVENTS, ...window.LIFEBOAT_FUTURE];
}

function findEvent(id) {
  return allMissions().find((event) => event.id === id);
}

function setStatus(text) {
  topStatus.textContent = text;
}

function refreshChrome() {
  const w = Present.worldOf(state);
  topMeta.textContent = `PRESENT ${state.presentYear} · PARADOX ${state.paradox}%`;
  helixEl.textContent = Present.helixNote(w);
  teamEl.innerHTML = Present.teamOf(w)
    .map(
      (person) => `
      <article class="dossier ${person.status === "missing" ? "missing" : ""}">
        <img src="${person.photo}" alt="${person.name}" />
        <div>
          <b>${person.name}</b>
          <p>${person.role} · ${person.status}</p>
          <p>${person.note}</p>
        </div>
      </article>`
    )
    .join("");
}

function go(screen, extra) {
  state.screen = screen;
  if (extra) Object.assign(state, extra);
  Engine.saveState(state);
  render();
}

function renderTitle() {
  setStatus("PROTOCOL STANDBY");
  view.innerHTML = `
    <p class="kicker">MASON ANNEX · CLASSIFIED</p>
    <h1>History is a suggestion.</h1>
    <p class="lead">Silas Crowe stole the mothership. You have the Lifeboat — a smaller machine, a smaller team, and a historian who remembers the century that is supposed to exist.</p>
    <div class="onboard-grid">
      <article class="panel"><b>1. Jump</b><p class="note">Pick a famous hour. Change it or protect it. Fourteen minutes on the ground, then extract.</p></article>
      <article class="panel"><b>2. Come home</b><p class="note">The warehouse rewrites. Newspapers, maps, faces. Mara is the only one who remembers the other present.</p></article>
      <article class="panel"><b>3. Crowe</b><p class="note">Skip an hour and he takes it. Helix wants a century it can inherit. You are late the moment you leave.</p></article>
    </div>
    <div class="row">
      <button type="button" id="enter">Power the Lifeboat</button>
      <button type="button" class="secondary" id="continue">${state.log.length ? "Continue current timeline" : "Skip briefing"}</button>
    </div>
  `;
  document.getElementById("enter").onclick = () => {
    window.LifeboatAudio?.ok();
    localStorage.setItem("lifeboat-onboard-v1", "1");
    go("briefing");
  };
  document.getElementById("continue").onclick = () => go("briefing");
}

function renderBriefing() {
  const w = Present.worldOf(state);
  const intel = Present.intelOf(w);
  const paper = Present.newspaper(w);
  const city = Present.futureCity(w, 2045);
  setStatus("BRIEFING LIVE");
  view.innerHTML = `
    <p class="kicker">PRESENT DAY · ${state.presentYear}</p>
    <h1>The room you have now</h1>
    <div class="present-grid">
      <article class="news ${state.log.length ? "morph" : ""}">
        <p class="news-mast">${paper.masthead}</p>
        <p class="news-date">${paper.date}</p>
        <h2>${paper.headline}</h2>
        <p>${paper.dek}</p>
        <p class="news-col">${paper.col}</p>
      </article>
      <article class="panel">
        <p class="kicker">SITUATION MAP</p>
        ${Present.worldMap(w)}
      </article>
    </div>
    <div class="grid-2" style="margin-top:16px">
      <div>
        <ul class="intel">
          ${intel.slice(0, 4).map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="row">
          <button type="button" id="missions">Open the hour list</button>
          <button type="button" class="secondary" id="log">Mission log</button>
        </div>
      </div>
      <aside class="panel">
        <p class="kicker">IF THIS HOLDS UNTIL 2045</p>
        <p class="note"><b>${city.name}</b> — ${city.tagline}</p>
        <p class="note muted">Crowe last plotted: ${state.croweEra}.</p>
        ${state.lastCrowe ? `<p class="note">While you were gone he took <b>${state.lastCrowe.eraLabel}</b>.</p>` : ""}
      </aside>
    </div>
  `;
  document.getElementById("missions").onclick = () => go("missions");
  document.getElementById("log").onclick = () => go("log");
}

function renderMissions() {
  setStatus("SELECT HOUR");
  const cards = allMissions()
    .map((event) => {
      const changed = Boolean(state.visited[event.id]);
      const futureLocked = event.kind === "future" && event.id === "future2080" && Object.keys(state.visited).length < 3;
      const future2045Locked = event.kind === "future" && event.id === "future2045" && Object.keys(state.visited).length < 1;
      const locked = futureLocked || future2045Locked;
      const crowe = state.croweMarks?.[event.id];
      const by = state.visitedBy?.[event.id];
      const mark = crowe && by !== "player" ? " · CROWE" : changed ? " · DIVERGED" : "";
      return `
        <button type="button" class="event-card ${changed ? "changed" : ""} ${crowe ? "crowe-mark" : ""} ${locked ? "locked" : ""}" data-id="${event.id}" ${locked ? "disabled" : ""}>
          <div class="year">${event.eraLabel}${mark}</div>
          <b>${event.title}</b>
          <p class="muted">${event.location}</p>
          <p>${Present.eventBriefing(event, state)}</p>
        </button>`;
    })
    .join("");

  view.innerHTML = `
    <p class="kicker">LIFEBOAT RANGE</p>
    <h1>Ten hours that still matter</h1>
    <p class="lead muted">Past first. Future unlocks after you have left fingerprints. 2080 waits until you have changed — or protected — at least three hours.</p>
    <div class="timeline">${cards}</div>
    <div class="row"><button type="button" class="secondary" id="back">Back to briefing</button></div>
  `;
  view.querySelectorAll(".event-card:not(:disabled)").forEach((btn) => {
    btn.onclick = () => {
      selectedEvent = findEvent(btn.dataset.id);
      go("mission");
    };
  });
  document.getElementById("back").onclick = () => go("briefing");
}

function renderMission() {
  const event = selectedEvent || findEvent(state.pendingEvent);
  if (!event) return go("missions");
  state.pendingEvent = event.id;
  Engine.saveState(state);
  setStatus(`ON THE GROUND · ${event.eraLabel}`);
  const intro = Present.eventIntro(event, state).replace(/\n/g, "<br><br>");
  view.innerHTML = `
    <p class="kicker">${event.location}</p>
    <h1>${event.title}</h1>
    <div class="grid-2">
      <div>
        <p class="body-copy">${intro}</p>
        <div class="choices">
          ${event.choices
            .map(
              (choice) => `
            <button type="button" class="choice" data-id="${choice.id}">
              <b>${choice.label}</b>
              <span>${choice.summary}</span>
            </button>`
            )
            .join("")}
        </div>
      </div>
      <aside class="paper">
        <p><b>Mara's prime note</b></p>
        <p>${event.prime}</p>
      </aside>
    </div>
  `;
  view.querySelectorAll(".choice").forEach((btn) => {
    btn.onclick = () => launch(event, event.choices.find((choice) => choice.id === btn.dataset.id));
  });
}

function launch(event, choice) {
  window.LifeboatAudio?.click();
  state = Engine.applyChoice(state, event, choice, "player");
  if (!event.kind) state = Engine.croweActs(state, window.LIFEBOAT_EVENTS);
  state.pendingEvent = event.id;
  Engine.saveState(state);
  renderTransit(event, choice);
}

function renderTransit(event, choice) {
  setStatus("JUMP");
  window.LifeboatAudio?.jump();
  const start = event.year;
  const label = event.year < 0 ? `${Math.abs(event.year)} BCE` : String(event.year);
  view.innerHTML = `
    <div class="transit">
      <div class="scanlines"></div>
      <p class="kicker">EXTRACTING · ${event.location}</p>
      <div class="year-spin" id="spin">${label}</div>
      <p class="muted" id="transit-line">Do not look at the light.</p>
    </div>
  `;
  const spin = document.getElementById("spin");
  const line = document.getElementById("transit-line");
  let t = 0;
  const timer = setInterval(() => {
    t += 1;
    spin.textContent = String(start + Math.round(Math.sin(t) * 90));
    if (t === 10) line.textContent = "Do not believe the first room you see.";
    if (t > 22) {
      clearInterval(timer);
      spin.textContent = "2026";
      line.textContent = "Warehouse lock.";
      window.LifeboatAudio?.return();
      setTimeout(() => renderAftermath(event, choice), 500);
    }
  }, 70);
}

function renderAftermath(event, choice) {
  setStatus("PRESENT REWRITTEN");
  const notes = Present.anomalies(state);
  const w = Present.worldOf(state);
  const city = Present.futureCity(w, 2045);
  const paper = Present.newspaper(w);
  if (state.lastCrowe) window.LifeboatAudio?.crowe();
  view.innerHTML = `
    <p class="kicker">RETURN · WAREHOUSE</p>
    <h1>${choice.label}</h1>
    <p class="lead">${choice.body}</p>
    ${notes.map((note) => `<div class="anomaly">${note}</div>`).join("")}
    ${
      state.lastCrowe
        ? `<div class="anomaly crowe-alert">
            <b>While you were gone — Crowe took ${state.lastCrowe.eraLabel} · ${state.lastCrowe.title}</b>
            <p>${state.lastCrowe.label}. ${state.lastCrowe.returnLine || ""}</p>
            <p class="muted">You can still jump that hour and overwrite him.</p>
          </div>`
        : ""
    }
    <div class="present-grid">
      <article class="news morph">
        <p class="news-mast">${paper.masthead}</p>
        <h2>${paper.headline}</h2>
        <p>${paper.dek}</p>
      </article>
      <article class="panel">
        <p class="kicker">2045 LOOKS LIKE</p>
        <p class="note"><b>${city.name}</b></p>
        <p class="note">${city.tagline}</p>
        ${Present.worldMap(w)}
      </article>
    </div>
    <div class="row">
      <button type="button" id="brief">Stand up. Brief the room.</button>
      <button type="button" class="secondary" id="again">Jump again</button>
    </div>
  `;
  refreshChrome();
  document.getElementById("brief").onclick = () => go("briefing");
  document.getElementById("again").onclick = () => go("missions");
}

function renderLog() {
  setStatus("LOG");
  const rows = state.log.length
    ? state.log
        .map(
          (entry) =>
            `<div class="panel" style="margin-bottom:8px"><b>${entry.year < 0 ? `${Math.abs(entry.year)} BCE` : entry.year} · ${entry.title}</b><p class="muted">${entry.actor === "crowe" ? "CROWE · " : ""}${entry.choice}</p></div>`
        )
        .join("")
    : `<p class="muted">No divergences recorded.</p>`;
  view.innerHTML = `
    <p class="kicker">AFTER ACTION</p>
    <h1>What you already did</h1>
    ${rows}
    <div class="row"><button type="button" class="secondary" id="back">Back</button></div>
  `;
  document.getElementById("back").onclick = () => go("briefing");
}

function render() {
  refreshChrome();
  if (state.screen === "missions") return renderMissions();
  if (state.screen === "mission") return renderMission();
  if (state.screen === "log") return renderLog();
  if (state.screen === "briefing") return renderBriefing();
  renderTitle();
}

render();
})();
