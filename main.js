/**
 * CYBER BLUE PROFESSIONAL PORTFOLIO - CONTROLLER
 * 
 * Features:
 * 1. Cyber Blue Console Slider (Night / Day)
 * 2. Native CSS Media Query Sync (@media prefers-color-scheme)
 * 3. Sophisticated Synthesized Cyber Audio Feedback
 * 4. Real-time Telemetry & Dynamic UI State
 */

// Media Query for OS Theme Detection
const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const inCardThemeBtn = document.getElementById('in-card-theme-btn');
const powerLed = document.getElementById('power-led');
const switchKnob = document.getElementById('switch-knob');
const themeSourceBadge = document.getElementById('theme-source-badge');
const osThemeReadout = document.getElementById('os-theme-readout');
const detectedThemeName = document.getElementById('detected-theme-name');
const cardThemeText = document.getElementById('card-theme-text');
const cardThemeIcon = document.getElementById('card-theme-icon');
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const soundIcon = document.getElementById('sound-icon');

// State
let soundEnabled = true;
let audioCtx = null;

/**
 * Web Audio API Cyber Sound Synthesizer
 */
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesize clean cyber audio pulses
 * @param {'switch' | 'hover' | 'click' | 'power'} type 
 */
function playCyberSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'switch') {
      // Tactile mechanical switch click + Cyber Laser Pulse
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(240, now);
      osc1.frequency.exponentialRampToValueAtTime(70, now + 0.05);

      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.06);

      // Cyber Laser Resonance (960Hz -> 1920Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(960, now + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(1920, now + 0.12);

      gain2.gain.setValueAtTime(0.12, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.02);
      osc2.stop(now + 0.16);

    } else if (type === 'click') {
      // Clean high-tech click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);

    } else if (type === 'hover') {
      // Subtle cybernetic blip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    }
  } catch (err) {
    console.debug('Audio error:', err);
  }
}

/**
 * Determine theme state:
 * - Checks user's manual override in localStorage
 * - Or detects default OS preference via CSS media query
 */
function getCurrentThemeState() {
  const manual = localStorage.getItem('cyber-theme-override');
  if (manual === 'dark' || manual === 'light') {
    return {
      theme: manual,
      isDark: manual === 'dark',
      source: 'MANUAL'
    };
  }
  const isDark = mediaQueryDark.matches;
  return {
    theme: isDark ? 'dark' : 'light',
    isDark: isDark,
    source: 'OS AUTO'
  };
}

/**
 * Synchronize UI (Slider knob position, LED light, telemetry text)
 */
function renderThemeUI() {
  const { theme, isDark, source } = getCurrentThemeState();

  // Apply or remove data-theme on :root
  if (localStorage.getItem('cyber-theme-override')) {
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    // Native CSS media queries handle default styling seamlessly
    document.documentElement.removeAttribute('data-theme');
  }

  // Update physical switch slider position (Night: 3px, Day: 35px)
  if (switchKnob) {
    switchKnob.style.left = isDark ? '3px' : '35px';
  }

  // Update glowing power diode LED
  if (powerLed) {
    if (isDark) {
      powerLed.style.backgroundColor = '#00f0ff';
      powerLed.style.boxShadow = '0 0 10px #00f0ff, 0 0 24px #00f0ff, 0 0 38px rgba(0, 240, 255, 0.9)';
    } else {
      powerLed.style.backgroundColor = '#38bdf8';
      powerLed.style.boxShadow = '0 0 10px #38bdf8, 0 0 20px #0284c7, 0 0 30px rgba(56, 189, 248, 0.75)';
    }
  }

  // Update badges & telemetry readouts
  if (themeSourceBadge) {
    themeSourceBadge.textContent = source;
  }
  if (detectedThemeName) {
    const osPref = mediaQueryDark.matches ? 'DARK' : 'LIGHT';
    detectedThemeName.textContent = `${isDark ? 'CYBER NIGHT' : 'CYBER DAY'} [OS: ${osPref}]`;
  }
  if (osThemeReadout) {
    osThemeReadout.textContent = `[THEME: ${isDark ? 'CYBER_NIGHT' : 'CYBER_DAY'} // ${source}]`;
  }

  // Update in-card button
  if (cardThemeText) {
    cardThemeText.textContent = isDark ? 'CYBER DAY MODE' : 'CYBER NIGHT MODE';
  }
  if (cardThemeIcon) {
    cardThemeIcon.textContent = isDark ? '⚡' : '🌐';
  }
}

/**
 * Toggle between Night and Day mode
 */
function toggleTheme() {
  const { isDark } = getCurrentThemeState();
  const nextTheme = isDark ? 'light' : 'dark';

  playCyberSound('switch');

  localStorage.setItem('cyber-theme-override', nextTheme);
  document.documentElement.setAttribute('data-theme', nextTheme);

  renderThemeUI();
}

// Event Listeners for Switches
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

if (inCardThemeBtn) {
  inCardThemeBtn.addEventListener('click', toggleTheme);
}

// Media Query Event Listener for real-time OS Theme switching
mediaQueryDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('cyber-theme-override')) {
    renderThemeUI();
  } else {
    if (detectedThemeName) {
      const osPref = e.matches ? 'DARK' : 'LIGHT';
      detectedThemeName.textContent = `MANUAL OVERRIDE [OS: ${osPref}]`;
    }
  }
});

// Audio Mute/Unmute Toggle Button
if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    if (soundEnabled) {
      playCyberSound('click');
    }
  });
}

// Interactive Cyber Button Sounds
document.querySelectorAll('.cyber-btn, .cyber-icon-button, .nav-link').forEach(elem => {
  elem.addEventListener('mouseenter', () => playCyberSound('hover'));
  elem.addEventListener('click', () => playCyberSound('click'));
});

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  renderThemeUI();
});
