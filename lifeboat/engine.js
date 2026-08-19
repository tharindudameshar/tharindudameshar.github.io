(() => {
const SAVE_KEY = "lifeboat-save-v1";

const PRIME_FLAGS = {
  caesar: "dead",
  press: "printed",
  america: "usa",
  lincoln: "dead",
  titanic: "sunk",
  ferdinand: "dead",
  pearl: "history",
  jfk: "dead",
  moon: "usa",
  wall: "falls",
};

function defaultState() {
  return {
    presentYear: 2026,
    paradox: 0,
    flags: { ...PRIME_FLAGS },
    visited: {},
    visitedBy: {},
    croweMarks: {},
    croweOnJump: 0,
    lastCrowe: null,
    log: [],
    croweEra: "unknown",
    screen: "title",
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed, flags: { ...PRIME_FLAGS, ...parsed.flags } };
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function resetState() {
  const next = defaultState();
  saveState(next);
  return next;
}

function applyChoice(state, eventDef, choice, actor = "player") {
  const before = { ...state.flags };
  const flags = { ...state.flags, ...choice.flags };
  const paradox = Math.min(100, state.paradox + (choice.paradox || 0));
  const visited = { ...state.visited, [eventDef.id]: choice.id };
  const visitedBy = { ...(state.visitedBy || {}), [eventDef.id]: actor };
  const croweMarks = { ...(state.croweMarks || {}) };
  if (actor === "crowe") croweMarks[eventDef.id] = true;

  const log = [
    {
      eventId: eventDef.id,
      choiceId: choice.id,
      title: eventDef.title,
      year: eventDef.year,
      choice: choice.label,
      actor,
    },
    ...state.log,
  ].slice(0, 24);

  if (actor === "crowe") {
    return {
      ...state,
      flags,
      paradox,
      visited,
      visitedBy,
      croweMarks,
      log,
      croweEra: choice.croweEra || state.croweEra,
      lastCrowe: {
        eventId: eventDef.id,
        title: eventDef.title,
        year: eventDef.year,
        eraLabel: eventDef.eraLabel,
        label: choice.label,
        body: choice.body,
        returnLine: choice.returnLine,
      },
    };
  }

  return {
    ...state,
    flags,
    paradox,
    visited,
    visitedBy,
    croweMarks,
    log,
    croweEra: choice.croweEra || state.croweEra,
    lastBefore: before,
    lastChoice: choice,
    lastEvent: eventDef.id,
    lastCrowe: null,
  };
}

function croweActs(state, events) {
  const playerCount = (state.log || []).filter((entry) => entry.actor !== "crowe").length;
  if (playerCount < 1) return state;
  if (state.croweOnJump === playerCount) return state;

  const unvisited = events.filter((event) => !state.visited[event.id]);
  if (!unvisited.length) {
    return { ...state, croweOnJump: playerCount, lastCrowe: null };
  }

  const target = unvisited[0];
  const choice = target.choices.find((item) => item.id === target.helixChoice);
  if (!choice) return { ...state, croweOnJump: playerCount };

  const next = applyChoice(state, target, choice, "crowe");
  next.croweOnJump = playerCount;
  return next;
}

window.LifeboatEngine = {
  PRIME_FLAGS,
  defaultState,
  loadState,
  saveState,
  resetState,
  applyChoice,
  croweActs,
};
})();
