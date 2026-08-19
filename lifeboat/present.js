(() => {
function worldOf(state) {
  const f = state.flags;
  const wwi = f.ferdinand !== "lives";
  const wwii = wwi && f.pearl !== "prevented";
  const usa = f.america === "usa" || f.america === "free1776";
  const haleExists = !(f.pearl === "warned" || f.ferdinand === "lives");
  const theoSister = f.titanic === "saved";

  return {
    flags: f,
    wwi,
    wwii,
    usa,
    haleExists,
    theoSister,
    paradox: state.paradox,
  };
}

function teamOf(w) {
  const mara = {
    name: "Dr. Mara Ellison",
    role: "Historian",
    status: "active",
    photo: "portraits/mara.png",
    note: w.flags.jfk === "lives"
      ? "Remembers a funeral. The file says she wrote a living presidency. She trusts her memory anyway."
      : "Keeps a private ledger of the prime timeline. If the room changes, she is the one who notices first.",
  };

  const hale = w.haleExists
    ? {
        name: "Capt. Jonah Hale",
        role: "Tactical",
        status: "active",
        photo: "portraits/hale.png",
        note: w.flags.america === "dominion"
          ? "Same face. Crown buttons. He checked his oath this morning and did not like the words."
          : "Delta-trained, impatient with paradox lectures. Has a grandfather on a ship that may or may not have burned.",
      }
    : {
        name: "Capt. Jonah Hale",
        role: "Tactical",
        status: "missing",
        photo: "portraits/hale.png",
        note: "NO RECORD. Badge in the tray. Mara still sets a third mug on the table.",
      };

  const theo = {
    name: "Theo Park",
    role: "Engineer",
    status: "active",
    photo: "portraits/theo.png",
    note: w.theoSister
      ? "Voicemail from a sister the prime timeline never gave him. He has not called back. He is afraid she will vanish if he does."
      : w.flags.press === "burned"
        ? "Learned machines in a world that treated print as late magic. He is twitchier about backups now."
        : "Keeps the Lifeboat from tearing a hole in Pennsylvania. Humor is structural.",
  };

  return [mara, hale, theo];
}

function intelOf(w) {
  const items = [];

  if (w.flags.caesar === "lives") {
    items.push("Europe's ceremonial calendar still names living-Caesar feast days. The Latin Union caucus meets in Rome, not Brussels.");
  } else if (w.flags.caesar === "tyrant") {
    items.push("Caesarist parties poll well in four republics. Voss has started using the word 'throne' without irony.");
  }

  if (w.flags.press === "burned") {
    items.push("Mass literacy arrives late. Early scientific societies are thinner. Helix liked that.");
  } else if (w.flags.press === "fast") {
    items.push("Pamphlet culture explodes a century early. Mara's bibliography grew overnight.");
  }

  if (w.flags.america === "dominion") {
    items.push("No United States. North America is a Crown dominion with restless legislatures. The warehouse flag has a wrong animal on it.");
  } else if (w.flags.america === "free1776") {
    items.push("The 1861 war never files. Lincoln is a different kind of famous. Reconstruction is not a word children learn.");
  }

  if (w.flags.lincoln === "lives") {
    items.push("A photograph: Lincoln, 1869, unfinished in the face. Reconstruction had an author.");
  } else if (w.flags.lincoln === "exposed") {
    items.push("Helix appears in 1865 as a named society. Crowe hates being historical.");
  }

  if (w.flags.titanic === "saved") {
    items.push("There is no Titanic wreck. The North Atlantic file is an insurance dispute. Several fortunes never became ghosts.");
  } else if (w.flags.titanic === "lineage") {
    items.push("A 2011 prize lecture cites a family that should have ended in steerage.");
  }

  if (!w.wwi) {
    items.push("No Great War as taught. July 1914 is a conference. Whole family trees, including Hale's, fail to form.");
  } else if (w.flags.ferdinand === "helix") {
    items.push("Textbooks mention Helix as a cause of 1914. The war still happened. The alibi did not.");
  }

  if (w.flags.pearl === "warned") {
    items.push("Pearl Harbor is a failed raid on empty water. Captain Hale has no personnel file.");
  } else if (w.flags.pearl === "prevented") {
    items.push("No Pacific spectacular in 1941. 1945 is diplomacy wearing a uniform, not a deck ceremony.");
  }

  if (w.flags.jfk === "lives") {
    items.push("Kennedy finishes the sixties. Vietnam and the moon program both change their posture.");
  } else if (w.flags.jfk === "exposed") {
    items.push("A 1964 committee names Helix. Officially wound down. Unofficially: Crowe bought a new name.");
  }

  if (w.flags.moon === "fail") {
    items.push("First flag on the moon is not yours. NASA is a proud second.");
  } else if (w.flags.moon === "static") {
    items.push("The landing holds. A second voice is in the recording. Both-true files are stacking up.");
  }

  if (w.flags.wall === "stands") {
    items.push("Two Germanys. The situation map still has a scar. Helix keeps an eastern ledger.");
  } else if (w.flags.wall === "early") {
    items.push("The Wall opened in 1988. Berlin is louder. Helix's eastern office is a dead account.");
  }

  if (!items.length) {
    items.push("Prime timeline looks intact. That only means the damage is still in the past, waiting.");
  }

  return items;
}

function helixNote(w) {
  if (w.flags.lincoln === "exposed" || w.flags.jfk === "exposed" || w.flags.ferdinand === "helix") {
    return "Helix has fingerprints in the public record. Crowe will try to make the record look like myth again.";
  }
  if (!w.wwi) {
    return "Without the World Wars, Helix never got its favorite chaos. Crowe is hunting a new catastrophe.";
  }
  if (w.flags.america === "dominion") {
    return "One empire is easier to own than fifty states. Crowe got what he wanted in Philadelphia.";
  }
  return "Silas Crowe stole the mothership. He edits famous hours so Helix inherits the century. Skip an hour and he will take it.";
}

function newspaper(w) {
  let masthead = "THE PRESENT REGISTER";
  let headline = "WORLD HOLDS THE SHAPE WE REMEMBER";
  let dek = "Officials insist the century is intact. The historian in the warehouse disagrees.";

  if (!w.usa) {
    masthead = "THE DOMINION HERALD";
    headline = "CROWN SEAT CONFIRMS AUTUMN SESSION";
    dek = "Provincial legislatures convene under the old banner. There is no United States in this morning's atlas.";
  } else if (w.flags.america === "free1776") {
    headline = "FOUNDERS' CLAUSE STILL THE LAW";
    dek = "School primers skip the war of 1861. It never filed.";
  }

  if (w.flags.caesar === "lives") {
    masthead = "ACTA DIURNA";
    headline = "LATIN UNION SITS IN ROME, NOT BRUSSELS";
    dek = "March 15 remains a feast of the living Caesar. Mara's calendar is the one that's wrong.";
  } else if (w.flags.caesar === "tyrant") {
    masthead = "ACTA DIURNA";
    headline = "CAESARIST CAUCUS GAINS FOUR CHAIRS";
    dek = "The word throne has returned to ordinary briefing English.";
  }

  if (!w.wwi) {
    headline = "VIENNA ACCORD HOLDS; NO GREAT WAR IN THE BOOKS";
    dek = "July 1914 is taught as a conference. Family trees are thinner. Some chairs in this room are empty.";
  } else if (w.flags.ferdinand === "helix") {
    headline = "1914 TEXTBOOKS NAME HELIX. THE WAR STILL CAME.";
  }

  if (w.flags.wall === "stands") {
    headline = "TWO GERMANYS, ONE SCAR, OPEN LEDGERS";
    dek = "West Station coffee still tastes like a border. Helix keeps an eastern office.";
  }

  if (w.flags.moon === "fail") {
    dek = `${dek} The lunar station answers in another language on first shift.`;
  }

  if (!w.haleExists) {
    dek = `${dek} A personnel file that should exist does not.`;
  }

  return {
    masthead,
    date: "18 August 2026",
    headline,
    dek,
    col: intelOf(w)[0],
  };
}

function worldMap(w) {
  const na = w.usa ? "#4d6d8a" : "#c4a35a";
  const eu = w.flags.caesar === "dead" ? "#5a6e5a" : "#b08a3a";
  const berlin = w.flags.wall === "stands";
  const moon = w.flags.moon === "fail" ? "#c45c4a" : "#e3b341";
  return `
    <svg class="world-map" viewBox="0 0 360 180" aria-label="Situation map">
      <rect width="360" height="180" fill="#0e1620"/>
      <rect x="28" y="42" width="92" height="58" rx="18" fill="${na}"/>
      <rect x="48" y="108" width="42" height="48" rx="12" fill="${na}" opacity="0.85"/>
      <rect x="148" y="38" width="52" height="38" rx="12" fill="${eu}"/>
      <rect x="152" y="82" width="46" height="58" rx="14" fill="#6a5a3a"/>
      <rect x="198" y="36" width="118" height="64" rx="16" fill="#3f5360"/>
      <rect x="248" y="118" width="44" height="22" rx="8" fill="#3f5360"/>
      ${berlin ? `<line x1="176" y1="36" x2="176" y2="78" stroke="#d45c4a" stroke-width="3"/>` : ""}
      ${w.flags.caesar !== "dead" ? `<circle cx="168" cy="62" r="5" fill="#e3b341"/>` : ""}
      <circle cx="330" cy="22" r="8" fill="${moon}"/>
      <text x="12" y="170" fill="#8b97a8" font-size="9">
        ${w.usa ? "NA: republic" : "NA: crown"} · ${berlin ? "DE: split" : "DE: open"} · moon: ${w.flags.moon}
      </text>
    </svg>`;
}

function futureCity(w, year) {
  if (!w.usa) {
    return {
      name: year === 2045 ? "New York Provincial" : "Imperial Atlantic",
      skyline: "dominion",
      tagline: "A crown capital that never had to become a republic.",
      streets: [
        "Union Jacks on glass towers. Court circulars on every kiosk.",
        year === 2080
          ? "The mothership is rumored to dock in the old navy yard, which is not old in this world."
          : "Hale, if he exists, wears a different oath on a different badge.",
      ],
      crowe: "He looks comfortable here. Empires are his furniture.",
    };
  }
  if (w.flags.caesar === "lives" || w.flags.caesar === "tyrant") {
    return {
      name: year === 2045 ? "Roma Nova" : "Urbs Aeterna",
      skyline: "latin",
      tagline: "Latin is a living bureaucratic language. Rome never became only a museum.",
      streets: [
        "Trams named for emperors. Phones that still boot in a classical calendar.",
        year === 2080
          ? "Helix letterhead is bilingual: English and a Latin that never died."
          : "The Latin Union flag hangs where Mara expects EU blue.",
      ],
      crowe: "He quotes Caesar without irony. So does everyone else.",
    };
  }
  if (!w.wwi) {
    return {
      name: year === 2045 ? "Vienna Accord" : "The Long Peace",
      skyline: "accord",
      tagline: "Empires aged in place. Nationalisms look like antiques and still kill people.",
      streets: [
        "No 20th-century meat grinder, so the 21st borrowed older knives.",
        year === 2080
          ? "A quieter map, denser palaces, fewer Hale-shaped holes — or more, depending on who never met."
          : "Jonah's chair is a problem this city does not know it has.",
      ],
      crowe: "He is hunting a catastrophe the wars never provided.",
    };
  }
  if (w.flags.wall === "stands") {
    return {
      name: year === 2045 ? "West Station, Berlin" : "The Seam",
      skyline: "split",
      tagline: "The scar through Germany is a border again, or still.",
      streets: [
        "Smugglers and Helix both love seams. The wall has wifi now.",
        year === 2080
          ? "Two Germanys, two futures, one machine that can still cross at night."
          : "Voss's mug still says WEST STATION. She does not think it is strange.",
      ],
      crowe: "His eastern ledger is a living account.",
    };
  }
  if (w.flags.moon === "fail") {
    return {
      name: year === 2045 ? "Zvezda-facing Houston" : "Second Place",
      skyline: "zvezda",
      tagline: "The lunar station answers in another language on the first shift.",
      streets: [
        "NASA is proud and late. Schoolroom moons wear a different flag.",
        year === 2080
          ? "Helix bought space the way it buys hours: from whoever got there first."
          : "Theo salutes a poster that is the wrong color.",
      ],
      crowe: "He likes a sky that does not belong to you.",
    };
  }
  if (w.paradox > 45) {
    return {
      name: year === 2045 ? "Palimpsest" : "Used Time",
      skyline: "glitch",
      tagline: "The century is noisy with leftover edits. Streets remember two names.",
      streets: [
        "A café that is also a ruin. A statue that is also a blank plinth.",
        year === 2080
          ? "If Helix won, it is because nobody could agree which present to defend."
          : "Mara's ledger has started writing in two columns.",
      ],
      crowe: "He is either a statue, a rumor, or the weather.",
    };
  }
  return {
    name: year === 2045 ? "Washington, mostly" : "The Receipt",
    skyline: "prime",
    tagline: year === 2045
      ? "The old war memorials are still visited. Newer ones depend on you."
      : "Quieter than it should be. Peace, or Helix already won the argument.",
    streets: [
      w.theoSister
        ? "Park family stone on a building that should have been an iceberg story."
        : "The warehouse still smells like ozone and bad coffee.",
      year === 2080
        ? "Crowe is a closed file, an open dock, or both."
        : "You are here to see what you already did.",
    ],
    crowe: w.haleExists ? "Still at large. Still smiling." : "He took a chair with him when the family trees collapsed.",
  };
}

function futureReport(w, year) {
  const city = futureCity(w, year);
  return [city.name, city.tagline, ...city.streets, `Crowe: ${city.crowe}`];
}

function anomalies(state) {
  const before = state.lastBefore;
  const after = state.flags;
  if (!before || !state.lastChoice) return [];
  const notes = [];
  const labels = {
    caesar: "Rome",
    press: "Print",
    america: "America",
    lincoln: "Lincoln",
    titanic: "Titanic",
    ferdinand: "1914",
    pearl: "Pacific 1941",
    jfk: "Dallas",
    moon: "Moon",
    wall: "Berlin",
  };
  for (const key of Object.keys(after)) {
    if (before[key] !== after[key]) {
      notes.push(`${labels[key] || key}: ${before[key]} → ${after[key]}`);
    }
  }
  if (state.lastChoice.returnLine) notes.push(state.lastChoice.returnLine);
  if (!notes.length) notes.push("Nothing obvious moved. Mara does not trust that.");
  return notes;
}

function eventIntro(eventDef, state) {
  const w = worldOf(state);
  return typeof eventDef.intro === "function" ? eventDef.intro(w) : eventDef.intro;
}

function eventBriefing(eventDef, state) {
  const w = worldOf(state);
  return typeof eventDef.briefing === "function" ? eventDef.briefing(w) : eventDef.prime;
}

window.LifeboatPresent = {
  worldOf,
  teamOf,
  intelOf,
  helixNote,
  futureReport,
  futureCity,
  newspaper,
  worldMap,
  anomalies,
  eventIntro,
  eventBriefing,
};
})();
