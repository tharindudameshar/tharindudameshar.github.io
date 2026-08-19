window.LIFEBOAT_EVENTS = [
  {
    id: "caesar",
    year: -44,
    title: "The Ides of March",
    location: "Rome, Theatre of Pompey",
    eraLabel: "44 BCE",
    helixChoice: "purge",
    prime:
      "Julius Caesar is stabbed by senators who believe they are saving the Republic. They instead bury it.",
    intro: `The marble is cold. You can smell blood before it happens — fear, iron, perfume.

Mara, low: "This is the hour the Republic pretends it still exists. Twenty-three knives. History says he sees Brutus last."

Jonah's hand is on a concealed pistol he cannot use here. Theo's wrist display is wrapped in linen, counting down the Lifeboat's stable window: fourteen minutes.

Crowe is in the colonnade. He wants a Rome that never stops being an empire — a Helix favorite: one man, one throne, forever.`,
    briefing: (w) =>
      w.flags.caesar === "dead"
        ? "Prime path: the assassination holds. The empire still follows."
        : w.flags.caesar === "lives"
          ? "Mara's notes no longer match. In this present, Caesar never died on the Ides."
          : "The plot failed in public. Caesar purged the Senate. Tyranny, not martyrdom.",
    choices: [
      {
        id: "prime",
        label: "Let the knives fall",
        summary: "Do not interfere. History keeps its wound.",
        body: "You hold the team in the crowd. Caesar falls. Brutus looks sick. The Republic has three more years, then a grave.",
        flags: { caesar: "dead" },
        paradox: 0,
        croweEra: "Rome, fleeing",
        returnLine: "Rome is still a ruin in the textbooks. The present feels like the one you left.",
      },
      {
        id: "warn",
        label: "Get a warning into Caesar's hand",
        summary: "A scrap of parchment: Beware the Ides. He skips the Senate.",
        body: "Theo forges a servant's seal. Caesar reads, laughs, then does not enter. The conspirators wait with nothing to stab but air. He will not be merciful later.",
        flags: { caesar: "lives" },
        paradox: 14,
        croweEra: "Alexandria, later",
        returnLine: "The briefing room calendar is wrong. March 15 is a feast day of the living Caesar.",
      },
      {
        id: "purge",
        label: "Expose the plot in the chamber",
        summary: "Name the senators. Watch Caesar become what they feared.",
        body: "Mara speaks Latin like a blade. Guards flood the aisle. Caesar lives, and the Senate does not. Helix will love this version of him.",
        flags: { caesar: "tyrant" },
        paradox: 18,
        croweEra: "Rome, recruiting",
        returnLine: "Director Voss now quotes Caesar in the morning brief. That used to be a joke.",
      },
    ],
  },
  {
    id: "press",
    year: 1455,
    title: "The Mainz Workshop",
    location: "Mainz, Gutenberg's press",
    eraLabel: "1455",
    helixChoice: "burn",
    prime: "Movable type makes books cheap. Ideas stop belonging only to the Church and the crown.",
    intro: `Ink, urine, metal. The shop is smaller than the legend.

"This machine is a weapon," Mara says. "Not a book. A weapon that fires copies."

Crowe's people are already in the alley with oil. Helix prefers a world where knowledge stays expensive.`,
    briefing: (w) =>
      w.flags.press === "printed"
        ? "The Bible leaves this room. The world learns to argue in ink."
        : w.flags.press === "burned"
          ? "In your present, print arrives late. Literacy is a privilege longer."
          : "Venice had type within a year. The explosion started early.",
    choices: [
      {
        id: "prime",
        label: "Guard the press until dawn",
        summary: "The first run survives. History's fuse stays lit.",
        body: "Jonah takes a broken bar to the alley. The oil never meets the wood. Gutenberg swears in German and keeps working.",
        flags: { press: "printed" },
        paradox: 0,
        croweEra: "Mainz, denied",
        returnLine: "Theo still complains that paper books smell better than screens. Same joke. Same world.",
      },
      {
        id: "burn",
        label: "Let Helix burn it — then steal one matrix",
        summary: "The shop dies. You pocket the idea for a later century.",
        body: "You are too slow, or you choose to be. Fire eats the type. Mara looks at you like you just shot a library. Theo palmed a single letter punch. It is not enough.",
        flags: { press: "burned" },
        paradox: 16,
        croweEra: "Mainz, satisfied",
        returnLine: "The archive has fewer early editions. Voss calls printing 'a 16th-century novelty.' Mara's stomach drops.",
      },
      {
        id: "venice",
        label: "Copy the type and run it to Venice",
        summary: "Print spreads years early, out of any one man's control.",
        body: "Theo sketches by candle, cursing. A courier leaves before sunrise. Mainz still prints. Italy prints faster. The Church will not keep the lid on.",
        flags: { press: "fast" },
        paradox: 11,
        croweEra: "Venice, hunting the courier",
        returnLine: "Mara's doctorate now lists an extra century of pamphlets. She does not remember writing that sentence. She did.",
      },
    ],
  },
  {
    id: "america",
    year: 1776,
    title: "A Decent Respect",
    location: "Philadelphia, Pennsylvania State House",
    eraLabel: "1776",
    helixChoice: "dominion",
    prime: "The Declaration is adopted. A new country writes itself into being.",
    intro: `Heat, flies, men in wool arguing about posterity.

Jonah mutters, "I took an oath to a flag that does not exist yet."

Mara: "It exists if they sign. That's the joke and the miracle."

Crowe wants a North America that never leaves the Crown — easier for Helix to own one empire than thirteen arguments.`,
    briefing: (w) => {
      if (w.flags.america === "usa") return "Independence holds. The map you grew up with still has a United States.";
      if (w.flags.america === "dominion") return "There is no United States. The briefing calls it the American Dominion.";
      return "Independence came with a clause that rewrote the next century: bondage banned in the founding document.";
    },
    choices: [
      {
        id: "prime",
        label: "Keep the room on schedule",
        summary: "The text stands. The names are signed.",
        body: "You are furniture with pistols. Jefferson's sentence about happiness survives the committee. History exhales.",
        flags: { america: "usa" },
        paradox: 0,
        croweEra: "New York, 1776",
        returnLine: "The flag in the warehouse is still the one Jonah enlisted under.",
      },
      {
        id: "dominion",
        label: "Intercept the adopted text",
        summary: "No clean proclamation. London keeps its claim.",
        body: "Theo swaps a satchel. The copy that reaches the printers is mush. The political moment dies in confusion. Crowe toasts with claret he should not have.",
        flags: { america: "dominion" },
        paradox: 22,
        croweEra: "London, celebrating",
        returnLine: "Jonah's uniform has a crown on the button. He notices it the same second you do.",
      },
      {
        id: "clause",
        label: "Force a freedom clause into the draft",
        summary: "Independence, and a sentence that detonates slavery at the founding.",
        body: "Mara finds Jefferson between sessions. She does not ask. She recites a paragraph as if it were already theirs. Some men storm out. Enough stay. The war will still be ugly. It will be a different ugly.",
        flags: { america: "free1776" },
        paradox: 20,
        croweEra: "Virginia, furious",
        returnLine: "The Civil War file is a thin folder labeled NEVER FOUGHT. Mara keeps reaching for a penny that does not mean what it meant.",
      },
    ],
  },
  {
    id: "lincoln",
    year: 1865,
    title: "Our American Cousin",
    location: "Washington, Ford's Theatre",
    eraLabel: "1865",
    helixChoice: "save",
    prime: "Abraham Lincoln is shot by John Wilkes Booth. Reconstruction loses its architect.",
    intro: (w) => {
      if (w.flags.america === "dominion") {
        return `This building is still a theatre, but the man in the box is a colonial governor the history you remember never had. Crowe still likes assassins. The job is the same: decide who gets to finish the war's peace.`;
      }
      if (w.flags.america === "free1776") {
        return `Lincoln is not a wartime president here. He is a senator attending a play. Booth is still in the wings — Helix loves a symbol. Mara whispers, "The gun can still change a century. Just a different century."`;
      }
      return `Laughter from the stage. A president who looks older than the money. Jonah hates this one: he has cleared rooms like this. He knows the door Booth uses.

"We can save him," Jonah says.

"And then Reconstruction is a person, not a wound," Mara answers. "That's not small."`;
    },
    briefing: (w) => {
      if (w.flags.america === "dominion") return "Ford's Theatre is still a kill box. The victim is not the Lincoln you studied.";
      if (w.flags.lincoln === "dead") return "Booth succeeds in the prime account. The 16th president dies.";
      if (w.flags.lincoln === "lives") return "Lincoln completed Reconstruction. Schoolbooks are kinder, and stranger to Mara.";
      return "Lincoln died, but Booth's Helix contacts were published. The conspiracy wore a name.";
    },
    choices: [
      {
        id: "prime",
        label: "Hold in the balcony opposite",
        summary: "You watch history be cruel. You do not draw.",
        body: "The laugh line comes. The shot comes. Jonah's jaw is stone. Mara recites the medical report she has memorized, and hates herself for being accurate.",
        flags: { lincoln: "dead" },
        paradox: 2,
        croweEra: "Maryland, with Booth's friends",
        returnLine: "The penny is still Lincoln. The war still has an epilogue nobody finished.",
      },
      {
        id: "save",
        label: "Stop Booth at the door",
        summary: "Jonah takes the pistol. Lincoln lives.",
        body: "No speech. A broken wrist. Booth on the boards, not the president. The audience thinks it is part of the play until it is not.",
        flags: { lincoln: "lives" },
        paradox: 15,
        croweEra: "Richmond, denied a martyr",
        returnLine: "Voss's wall has a photograph: Lincoln in 1869, older, tired, alive. Mara's memory has a funeral. Both are true for someone.",
      },
      {
        id: "diary",
        label: "Let the shot happen — steal the diary",
        summary: "Lincoln dies. Helix's 19th-century names leave the theatre with you.",
        body: "You choose the file over the man. Mara will not forgive you quickly. Theo photographs pages that should not exist: Helix donors in 1865.",
        flags: { lincoln: "exposed" },
        paradox: 10,
        croweEra: "Philadelphia, burning papers",
        returnLine: "Helix is in the official record as a 'disbanded 1860s society.' Crowe will not enjoy that sentence.",
      },
    ],
  },
  {
    id: "titanic",
    year: 1912,
    title: "Unsinkable",
    location: "North Atlantic, R.M.S. Titanic",
    eraLabel: "1912",
    helixChoice: "warn",
    prime: "The ship hits ice and takes 1,500 people with the myth of unsinkable engineering.",
    intro: `The deck is too proud. The stars are too clear.

Theo looks physically ill. "They told the world the math was finished. It wasn't."

Crowe is in first class under a false name. He likes the donor list on this ship — Astors, Strauses, a few Helix fortunes that drown or don't.`,
    briefing: (w) =>
      w.flags.titanic === "sunk"
        ? "The wreck is still on the bottom. The regulations came after the bodies."
        : w.flags.titanic === "saved"
          ? "Titanic docks in New York. There is no wreck. There is a very different social register."
          : "The ship sank. A third-class family you moved to a boat changed a bloodline.",
    choices: [
      {
        id: "prime",
        label: "Do not touch the bridge",
        summary: "The iceberg has an appointment. You keep it.",
        body: "Mara counts lifeboats and looks away. Jonah helps strangers into boats until Theo drags him back to the jump window.",
        flags: { titanic: "sunk" },
        paradox: 0,
        croweEra: "A lifeboat, first class",
        returnLine: "The documentary is still on late-night television. Same wreck. Same cold.",
      },
      {
        id: "warn",
        label: "Get the iceberg warning onto the bridge",
        summary: "They slow down. They live. The century loses its favorite warning story.",
        body: "Theo forges a Marconi slip. The officer on watch actually reads. The ship groans, turns, lives. Millionaires walk into New York who were supposed to be ghosts.",
        flags: { titanic: "saved" },
        paradox: 13,
        croweEra: "New York harbor, adapting",
        returnLine: "Theo has a voicemail from a sister who did not exist this morning. He sits down on the warehouse floor.",
      },
      {
        id: "boat",
        label: "Move one steerage family into a boat",
        summary: "The disaster holds. One lineage does not drown.",
        body: "Jonah does not wait for permission. A child, a mother, a father who almost stays. The ship still dies. The math of the world ticks one family over.",
        flags: { titanic: "lineage" },
        paradox: 6,
        croweEra: "The wreck, untouched",
        returnLine: "A Nobel speech from 2011 now includes a name Mara has never taught. The slides updated themselves.",
      },
    ],
  },
  {
    id: "ferdinand",
    year: 1914,
    title: "The Wrong Corner",
    location: "Sarajevo",
    eraLabel: "1914",
    helixChoice: "helix",
    prime: "Franz Ferdinand's driver stalls on the right street. Gavrilo Princip fires. The 20th century becomes a meat grinder.",
    intro: `A city dressed for an archduke. A bomb already failed this morning.

Mara's voice is tight. "If he lives, there may be no Great War as we know it. If there is no Great War, your grandparents do not meet. I need you to hear that before Jonah plays hero."

Jonah: "So we let a kid shoot a man so I can exist?"

"Welcome to the Lifeboat," Theo says. "We should put that on the hatch."`,
    briefing: (w) =>
      w.flags.ferdinand === "dead"
        ? "The assassination holds. The trenches still follow."
        : w.flags.ferdinand === "lives"
          ? "The Archduke went home. The July crisis became a conference. The 20th century is almost unrecognizable."
          : "He died anyway. The papers blamed a Helix-linked cell. The war still came, with a named villain.",
    choices: [
      {
        id: "prime",
        label: "Let the motorcade stall",
        summary: "Princip gets his corner. The fuse of 1914 stays lit.",
        body: "You do not shout. You do not wave the car through. Two shots. A century of graves. Jonah will not look at Mara for a while.",
        flags: { ferdinand: "dead" },
        paradox: 0,
        croweEra: "Belgrade, 1914",
        returnLine: "The maps of Europe still have their scars. Jonah's grandfather still exists on paper.",
      },
      {
        id: "save",
        label: "Wave the driver through",
        summary: "No stall. No shot. The war may never start.",
        body: "Jonah steps into traffic like a cop. The car does not stop. Princip is just a boy with a sandwich and a pistol and no angle. The archduke complains about lunch.",
        flags: { ferdinand: "lives" },
        paradox: 28,
        croweEra: "Vienna, rewriting plans",
        returnLine: "The warehouse map has no 'World War I' plaque. Hale's family photo is a blank card. Mara starts writing names from memory before they fade.",
      },
      {
        id: "helix",
        label: "Save him, then lose him to a second shooter",
        summary: "Helix finishes the job. The war happens, and wears their fingerprints.",
        body: "You spoil Princip. A different rifle, a different roof. Crowe wanted a war. He gets one, sloppier, with witnesses Mara can file.",
        flags: { ferdinand: "helix" },
        paradox: 12,
        croweEra: "Sarajevo, exposed",
        returnLine: "Schoolbooks mention Helix as a footnote to the Great War. Crowe's myth is cheaper now. He will try to make it expensive again.",
      },
    ],
  },
  {
    id: "pearl",
    year: 1941,
    title: "Sunday Morning",
    location: "Oahu, Territory of Hawaii",
    eraLabel: "1941",
    helixChoice: "prevent",
    prime: "The attack on Pearl Harbor pulls the United States into a war it had been watching.",
    intro: (w) => {
      if (w.flags.ferdinand === "lives") {
        return `There was no Western Front in this world, but the Pacific is still a powder magazine. Carriers, oil, an empire looking east. Crowe can still start a war. The uniforms just have different patches.`;
      }
      return `Palm, fuel, Sunday laundry. Jonah's grandfather is somewhere on those decks in the prime timeline.

"If we warn them," Jonah says, "those ships move. Men live. And I have no idea if I still get born."

Mara: "That is the whole job, Captain."`;
    },
    briefing: (w) => {
      if (w.flags.pearl === "history") return "The attack succeeds in the historical account. The United States enters the war.";
      if (w.flags.pearl === "warned") return "The fleet was at sea. The raid failed. Jonah's file is unstable.";
      return "The raid never launched. The United States stayed out longer. The map of 1945 is a different argument.";
    },
    choices: [
      {
        id: "prime",
        label: "Watch the sky from the hills",
        summary: "No warning. The Sunday you know arrives.",
        body: "The first wave is silver and loud. Jonah stands until Theo pulls him. Some oaths are to the dead.",
        flags: { pearl: "history" },
        paradox: 0,
        croweEra: "Tokyo, 1941",
        returnLine: "The memorial is still there. Hale is still in the briefing. He looks older than he did an hour ago, or you do.",
      },
      {
        id: "warn",
        label: "Get the warning through",
        summary: "The fleet sails. The raid hits empty water. Grandfathers shuffle.",
        body: "Mara uses a phone that should not know her voice. Officers believe a woman who should not be there. Sirens. Wakes. Empty berths. History misses its easy wound.",
        flags: { pearl: "warned" },
        paradox: 19,
        croweEra: "Oahu, denied a spectacle",
        returnLine: "Captain Hale's chair is empty. His access badge sits in a tray labeled NO RECORD. Mara says his name out loud so the room cannot forget it.",
      },
      {
        id: "prevent",
        label: "Sabotage the strike before it leaves",
        summary: "No raid at all. America sleeps longer.",
        body: "You jump earlier than doctrine allows. Theo hates you for the fuel. A fuel barge, a delay, a launch window missed. Peace is just a longer fuse.",
        flags: { pearl: "prevented" },
        paradox: 21,
        croweEra: "The Pacific, improvising",
        returnLine: "The 'Great War' files now run longer. 1945 is a conference, not a surrender deck. Voss looks like she has been fighting a colder thing for years.",
      },
    ],
  },
  {
    id: "jfk",
    year: 1963,
    title: "The Motorcade",
    location: "Dallas, Dealey Plaza",
    eraLabel: "1963",
    helixChoice: "file",
    prime: "John F. Kennedy is killed in an open car. America learns to distrust its own story.",
    intro: `A plaza that will be photographed to death.

"Every amateur historian wants this one," Mara says. "That is why Helix likes it. Hide a coup inside a national obsession."

Jonah wants a clean shot at a ghost. Theo is watching windows, not grassy knolls.`,
    briefing: (w) => {
      if (w.flags.jfk === "dead") return "Dallas holds. The 1960s remain a broken hinge.";
      if (w.flags.jfk === "lives") return "Kennedy finished the decade. Vietnam and the moon both wore different faces.";
      return "He lived long enough for the Helix file to hit a committee. Trust is a different wreck.";
    },
    choices: [
      {
        id: "prime",
        label: "Stay in the crowd",
        summary: "The limousine makes the turn. History keeps its film.",
        body: "You do not look at the window you could storm. The sound is smaller than movies. Mara recites the time. She is shaking.",
        flags: { jfk: "dead" },
        paradox: 0,
        croweEra: "Dallas, vanishing",
        returnLine: "The documentaries are still endless. Same plaza. Same unanswered questions.",
      },
      {
        id: "save",
        label: "Break the line and cover the car",
        summary: "Jonah is a Secret Service extra. The president lives.",
        body: "A shove, a body, a missed angle. Chaos. Kennedy is furious and alive. The century has to invent a different tragedy.",
        flags: { jfk: "lives" },
        paradox: 17,
        croweEra: "Mexico City, 1963",
        returnLine: "Mara's dissertation title on the monitor is wrong. She wrote about a living presidency. She remembers a funeral.",
      },
      {
        id: "file",
        label: "Save him and drop the Helix file in the trunk",
        summary: "He lives. The conspiracy gets a barcode.",
        body: "Theo tapes a folder under the seat. Names, money, a Dallas safehouse. The president survives. The hearings will eat the 1960s anyway.",
        flags: { jfk: "exposed" },
        paradox: 14,
        croweEra: "Langley, burning",
        returnLine: "Helix is a 1964 scandal, officially 'wound down.' Crowe is a rumor with a better tailor.",
      },
    ],
  },
  {
    id: "moon",
    year: 1969,
    title: "One Small Theft",
    location: "Tranquility Base / Houston",
    eraLabel: "1969",
    helixChoice: "abort",
    prime: "Apollo 11 lands. The flag is American. The century looks up.",
    intro: (w) => {
      const soviet = w.flags.jfk === "lives" ? "Kennedy's moon speech still happened — he just got to watch it." : "Armstrong is hours from a sentence every child will learn.";
      return `Houston smells like coffee and fear. The Lifeboat cannot sit on the moon; Theo can sit in the telemetry.

${soviet}

Crowe wants the first words to belong to Helix — a pirate broadcast from a dead channel.`;
    },
    briefing: (w) => {
      if (w.flags.moon === "usa") return "Armstrong's step holds. NASA still owns the postcard.";
      if (w.flags.moon === "fail") return "The landing aborted. Another flag got there first in the books you now have.";
      return "The landing happened. The voice on the loop is not Armstrong's. The present pretends not to hear it.";
    },
    choices: [
      {
        id: "prime",
        label: "Keep Crowe off the channel",
        summary: "The words stay human. The flag stays the one you remember.",
        body: "Theo fights a ghost in the switchgear. Mara watches the monitor like church. The bootprint lands where it is supposed to.",
        flags: { moon: "usa" },
        paradox: 0,
        croweEra: "Houston, locked out",
        returnLine: "The poster in the hall is still Armstrong. Theo salutes it ironically, same as always.",
      },
      {
        id: "abort",
        label: "Force an abort to stop Helix",
        summary: "No landing. The race stays open. Someone else writes the postcard.",
        body: "You cut a line you cannot uncut. Alarm. Abort. Men come home. A different anthem will play on a different month.",
        flags: { moon: "fail" },
        paradox: 16,
        croweEra: "Baikonur, interested",
        returnLine: "The moon poster is a red circle and a date in 1970. Mara says 'that's not ours' and Voss says 'it is now.'",
      },
      {
        id: "voice",
        label: "Let them land, steal the first words back",
        summary: "Boots on soil. The broadcast is a scuffle. Helix almost names itself to the world.",
        body: "Static, a second voice, Theo swearing. The world hears a fragment that textbooks will call interference. Helix hears a near win.",
        flags: { moon: "static" },
        paradox: 9,
        croweEra: "The dark side, mythmaking",
        returnLine: "Conspiracy radio is louder. A clip exists that should not. Mara files it under BOTH TRUE.",
      },
    ],
  },
  {
    id: "wall",
    year: 1989,
    title: "The Open Gate",
    location: "Berlin, Bornholmer Strasse",
    eraLabel: "1989",
    helixChoice: "stands",
    prime: "A bungled press conference, a crowd, a gate. The Wall opens. The Cold War starts dying in public.",
    intro: `Night, Trabants, a border guard who does not want to be a villain.

"This one is fragile," Mara says. "A sentence on television. A man who guesses. History hinging on a shrug."

Crowe would rather the shrug go the other way — two Germanys, two markets, a Helix playground in the seams.`,
    briefing: (w) => {
      if (w.flags.wall === "falls") return "The Wall opened. Berlin is one city in the present you are standing in.";
      if (w.flags.wall === "stands") return "The order held. There are still two Germanys on the situation map.";
      return "It opened early. Unification ran hotter and faster. Helix lost a sanctuary in the east.";
    },
    choices: [
      {
        id: "prime",
        label: "Keep the guard guessing",
        summary: "The crowd presses. The gate opens. Champagne and concrete.",
        body: "You are bodies in a crowd. A man lifts a barrier because he cannot think of a rule that covers this. The century leaks through.",
        flags: { wall: "falls" },
        paradox: 0,
        croweEra: "West Berlin, leaving",
        returnLine: "The chunk of concrete on Voss's shelf is still a souvenir, not a prophecy.",
      },
      {
        id: "stands",
        label: "Get the Stasi the protest timing",
        summary: "The street is cleared. The Wall lives.",
        body: "A phone call. Trucks. Water. The shrug never happens. Mara looks at the concrete like it just grew teeth.",
        flags: { wall: "stands" },
        paradox: 18,
        croweEra: "East Berlin, home",
        returnLine: "The map has a thick black line through Germany. Voss's coffee mug says WEST STATION. She does not think it is strange.",
      },
      {
        id: "early",
        label: "Leak the memo a year early",
        summary: "1988 breaks instead of 1989. Helix loses the seam.",
        body: "Theo faxes a thing that is not a fax. Historians will argue about the spark. The crowd is earlier, hungrier. Crowe's eastern office never opens.",
        flags: { wall: "early" },
        paradox: 8,
        croweEra: "Prague, falling back",
        returnLine: "Berlin is louder in the intel summaries. The EU file is thicker. Helix's eastern ledger is a dead account.",
      },
    ],
  },
];

window.LIFEBOAT_FUTURE = [
  {
    id: "future2045",
    year: 2045,
    title: "Forward Observation",
    location: "The city your past grew",
    eraLabel: "2045",
    kind: "future",
    prime: "A reconnaissance jump. The future is not a place. It is a consequence.",
    intro: (w) => {
      const city = window.LifeboatPresent.futureCity(w, 2045);
      return `The Lifeboat hates this direction. Restraints on. Hatch open.

You are in ${city.name}.

${city.tagline}

${city.streets.join(" ")}

Mara reads a paper dated 2045 that she does not remember writing. Crowe: ${city.crowe}`;
    },
    briefing: (w) => window.LifeboatPresent.futureCity(w, 2045).tagline,
    choices: [
      {
        id: "observe",
        label: "Observe only",
        summary: "Do not touch 2045. Bring the report home.",
        body: "You walk, you listen, you do not sign anything. The future stares back like a bill.",
        flags: {},
        paradox: 4,
        croweEra: "2045, watching you watch",
        returnLine: "The briefing updates with photographs you took of buildings that might not stay.",
      },
      {
        id: "cache",
        label: "Leave a cache for your present selves",
        summary: "A letter, a key, a warning. Bootstrap territory.",
        body: "Mara writes to Mara. Theo hates paradox math. Jonah posts a watch at the door. You are becoming the kind of people Helix already is.",
        flags: {},
        paradox: 10,
        croweEra: "2045, intercepting mail",
        returnLine: "A locked drawer in the warehouse now has a key that was always there. Nobody admits who put it there.",
      },
      {
        id: "hunt",
        label: "Hunt Crowe's older self",
        summary: "He has had decades. So have you, on paper.",
        body: "A near miss in a transit hub that should not exist. He smiles like you are late to a meeting he scheduled in 1914.",
        flags: {},
        paradox: 8,
        croweEra: "2045, wounded, alive",
        returnLine: "Crowe's file gains a photograph dated 2045. He looks like he has been winning.",
      },
    ],
  },
  {
    id: "future2080",
    year: 2080,
    title: "The Far Bank",
    location: "The far bank of your decisions",
    eraLabel: "2080",
    kind: "future",
    prime: "If Helix wins, this is their weather. If they lose, this is the quiet after.",
    intro: (w) => {
      const city = window.LifeboatPresent.futureCity(w, 2080);
      return `Fifty-four years from the warehouse. The machine ticks like it is tired.

${city.name}. ${city.tagline}

${city.streets.join(" ")}

"This is the receipt," Mara says. Crowe: ${city.crowe}`;
    },
    briefing: (w) => window.LifeboatPresent.futureCity(w, 2080).tagline,
    choices: [
      {
        id: "record",
        label: "Record the end-state and leave",
        summary: "No more heroics. Evidence only.",
        body: "You fill a drive. You do not stay long enough to belong here.",
        flags: {},
        paradox: 6,
        croweEra: "2080, or a grave",
        returnLine: "Voss watches the 2080 footage twice. She does not tell you which version she prefers.",
      },
      {
        id: "seed",
        label: "Seed a counter-Helix",
        summary: "Found the people who still argue. Give them a name.",
        body: "You leave a myth with better paperwork. Maybe it helps 2026. Maybe it is just graffiti on time.",
        flags: {},
        paradox: 12,
        croweEra: "2080, contested",
        returnLine: "A recruitment pamphlet in the present now cites a group that will exist in fifty years. Theo puts his head on the table.",
      },
      {
        id: "close",
        label: "Try to close the loop on Crowe",
        summary: "One shot at the man who stole the mothership.",
        body: "You find a machine that looks like yours and older. You do not find certainty. You find a choice you will have to live with in 2026.",
        flags: {},
        paradox: 15,
        croweEra: "unknown",
        returnLine: "The mothership ping is gone — or it is everywhere. The team argues until dawn.",
      },
    ],
  },
];
