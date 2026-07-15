export type SignalInstabilitySettings = {
  enabled: boolean;
  strength: number;
  frequency: number;
};

export type SignalInstabilityState = {
  intensity: number;
  horizontalSync: number;
  verticalSync: number;
  staticNoise: number;
  chromaNoise: number;
  seed: number;
  phase: number;
};

type SignalInstabilityEvent = {
  startTimeSec: number;
  endTimeSec: number;
  decayEndTimeSec: number;
  rampInSec: number;
  phaseRate: number;
  seed: number;
  intensity: number;
  horizontalSync: number;
  verticalSync: number;
  staticNoise: number;
  chromaNoise: number;
};

const ZERO_SIGNAL_INSTABILITY_STATE: SignalInstabilityState = {
  intensity: 0,
  horizontalSync: 0,
  verticalSync: 0,
  staticNoise: 0,
  chromaNoise: 0,
  seed: 0,
  phase: 0,
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const smoothstep = (edge0: number, edge1: number, x: number) => {
  if (edge0 === edge1) {
    return x < edge0 ? 0 : 1;
  }
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

export class SignalInstabilityController {
  private currentEvent: SignalInstabilityEvent | null = null;
  private lastUpdateTimeSec: number | null = null;

  constructor(private readonly random: () => number = Math.random) {}

  reset() {
    this.currentEvent = null;
    this.lastUpdateTimeSec = null;
  }

  update(
    timeSec: number,
    settings: SignalInstabilitySettings,
  ): SignalInstabilityState {
    const strength = clamp01(settings.strength);
    const frequency = clamp01(settings.frequency);

    if (!settings.enabled || strength <= 0 || frequency <= 0) {
      this.reset();
      this.lastUpdateTimeSec = timeSec;
      return ZERO_SIGNAL_INSTABILITY_STATE;
    }

    const previousTimeSec = this.lastUpdateTimeSec;
    this.lastUpdateTimeSec = timeSec;

    if (this.currentEvent && timeSec >= this.currentEvent.decayEndTimeSec) {
      this.currentEvent = null;
    }

    if (!this.currentEvent && previousTimeSec !== null) {
      const dtSec = Math.max(0, Math.min(0.25, timeSec - previousTimeSec));
      this.maybeStartEvent(timeSec, dtSec, strength, frequency);
    }

    const event = this.currentEvent;
    if (!event) {
      return ZERO_SIGNAL_INSTABILITY_STATE;
    }

    const rampIn = smoothstep(
      event.startTimeSec,
      event.startTimeSec + event.rampInSec,
      timeSec,
    );
    const decay =
      timeSec <= event.endTimeSec
        ? 1
        : 1 - clamp01((timeSec - event.endTimeSec) / Math.max(event.decayEndTimeSec - event.endTimeSec, 0.001));
    const envelope = rampIn * decay;
    if (envelope <= 0.0005) {
      return ZERO_SIGNAL_INSTABILITY_STATE;
    }

    return {
      intensity: event.intensity * envelope,
      horizontalSync: event.horizontalSync * envelope,
      verticalSync: event.verticalSync * envelope,
      staticNoise: event.staticNoise * envelope,
      chromaNoise: event.chromaNoise * envelope,
      seed: event.seed,
      phase: Math.floor(Math.max(0, timeSec - event.startTimeSec) * event.phaseRate),
    };
  }

  private maybeStartEvent(
    timeSec: number,
    dtSec: number,
    strength: number,
    frequency: number,
  ) {
    if (dtSec <= 0) {
      return;
    }

    const ratePerSecond =
      (0.025 + frequency * 1.2) *
      (0.35 + strength * 0.65);
    const startChance = 1 - Math.exp(-ratePerSecond * dtSec);
    if (this.random() >= startChance) {
      return;
    }

    const eventStrength = (0.25 + this.random() * 0.75) * (0.3 + strength * 0.7);
    const durationSec =
      0.05 + Math.pow(this.random(), 1.3) * (0.08 + strength * 0.37);
    const decaySec = 0.015 + this.random() * 0.08;
    this.currentEvent = {
      startTimeSec: timeSec,
      endTimeSec: timeSec + durationSec,
      decayEndTimeSec: timeSec + durationSec + decaySec,
      rampInSec: 0.008 + this.random() * 0.03,
      phaseRate: 10 + Math.floor(this.random() * 8),
      seed: this.random() * 1024,
      intensity: eventStrength,
      horizontalSync:
        eventStrength *
        (0.45 + this.random() * 0.75),
      verticalSync: 0,
      staticNoise:
        eventStrength *
        (0.3 + this.random() * 0.8),
      chromaNoise:
        eventStrength *
        (0.18 + this.random() * 0.45),
    };
  }
}

export const createSignalInstabilityController = (
  random?: () => number,
) => new SignalInstabilityController(random);
