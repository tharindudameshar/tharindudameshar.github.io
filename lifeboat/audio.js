(() => {
let ctx = null;

function audio() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq, duration, type = "square", gain = 0.04, delay = 0) {
  try {
    const ac = audio();
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g);
    g.connect(ac.destination);
    const start = ac.currentTime + delay;
    osc.start(start);
    g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.stop(start + duration);
  } catch {
    /* autoplay */
  }
}

window.LifeboatAudio = {
  click: () => tone(520, 0.05, "square", 0.03),
  jump: () => {
    tone(180, 0.35, "sawtooth", 0.05);
    tone(90, 0.5, "sine", 0.06, 0.05);
    tone(740, 0.12, "square", 0.03, 0.2);
  },
  return: () => {
    tone(220, 0.12, "square", 0.04);
    tone(330, 0.12, "square", 0.04, 0.1);
    tone(440, 0.18, "square", 0.045, 0.2);
  },
  crowe: () => {
    tone(110, 0.4, "sawtooth", 0.05);
    tone(116, 0.4, "square", 0.03, 0.02);
  },
  ok: () => tone(880, 0.07, "square", 0.03),
};
})();
