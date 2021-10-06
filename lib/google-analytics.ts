import { checkIsLocalhost } from './location';
import { GoogleAnalyticsEvents } from './types';

declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
  }
}

type EventGameStart = {
  event: GoogleAnalyticsEvents.GAME_START;
  projectTitle: string;
};

type EventGameRestart = {
  event: GoogleAnalyticsEvents.GAME_RESTART;
  projectTitle: string;
};

type EventGameEndAuto = {
  event: GoogleAnalyticsEvents.GAME_END_AUTO;
  projectTitle: string;
  gameScore: number;
};

export function trackEvent(
  data: EventGameStart | EventGameRestart | EventGameEndAuto
) {
  if (checkIsLocalhost()) {
    return;
  }

  window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
  window.dataLayer.push(data);
}
