// Shared state for the landing page's videos with a soundtrack.
//
// - Sound: one page-wide choice, on by default: videos always try to play
//   with sound. Browsers refuse that until the visitor has interacted with
//   the page (a click, tap or key; not scrolling) unless the site is allowed
//   sound, so a refused video plays muted and the first interaction anywhere
//   turns the sound on. Pressing a video's mute button turns it off
//   for every video.
// - One at a time: a video that starts playing on screen pauses the others,
//   so two soundtracks never overlap.

type Listener = () => void

let soundOn = true
let activated = false
const listeners = new Set<Listener>()
let current: HTMLVideoElement | null = null

const notify = () => listeners.forEach((listener) => listener())

/** Video play/sound buttons mark themselves so pressing them isn't read as a
 *  general "the visitor interacted" (their own click decides instead). */
export const VIDEO_CONTROL_ATTR = "data-video-control"

const ACTIVATION_EVENTS = ["pointerdown", "keydown", "touchend"] as const

/** Records the visitor's first interaction (also called by the buttons). */
export const markActivated = () => {
  if (activated) return
  ACTIVATION_EVENTS.forEach((name) =>
    document.removeEventListener(name, onActivate, true)
  )
  activated = true
  notify()
}

function onActivate(event: Event) {
  const target = event.target
  if (target instanceof Element && target.closest(`[${VIDEO_CONTROL_ATTR}]`))
    return
  ACTIVATION_EVENTS.forEach((name) =>
    document.removeEventListener(name, onActivate, true)
  )
  activated = true
  // Unmute inside the gesture itself (Safari requires it), then let the
  // components catch up.
  if (soundOn && current && !current.paused) {
    current.muted = false
    current.play().catch(() => {
      if (current) current.muted = true
    })
  }
  notify()
}

let listening = false
const listenForActivation = () => {
  if (listening || typeof document === "undefined") return
  listening = true
  ACTIVATION_EVENTS.forEach((name) =>
    document.addEventListener(name, onActivate, true)
  )
}

export const subscribeSound = (listener: Listener) => {
  listenForActivation()
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const getSound = () => soundOn

export const setSound = (on: boolean) => {
  if (on === soundOn) return
  soundOn = on
  notify()
}

/** Changes whenever sound may have become allowed (re-run effects on it). */
export const getActivated = () => activated

/** Makes `video` the one playing video, pausing whichever played before. */
export const claimPlayback = (video: HTMLVideoElement) => {
  if (current && current !== video && !current.paused) current.pause()
  current = video
}

export const releasePlayback = (video: HTMLVideoElement) => {
  if (current === video) current = null
}
