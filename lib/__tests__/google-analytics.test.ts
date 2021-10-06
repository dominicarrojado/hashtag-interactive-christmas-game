import {
  getFakeDomainWord,
  getFakeNumber,
  getFakeSentence,
  setReadOnlyProperty,
} from '../test-helpers';
import { GoogleAnalyticsEvents } from '../types';
import { trackEvent } from '../google-analytics';

describe('google-analytics utilities', () => {
  describe('trackEvent()', () => {
    const dataLayerOrig = window.dataLayer;
    const locationOrig = window.location;

    beforeEach(() => {
      delete (window as any).dataLayer;
      delete (window as any).location;
    });

    afterEach(() => {
      window.dataLayer = dataLayerOrig;
      setReadOnlyProperty(window, 'location', locationOrig);
    });

    it('should NOT track event on local development', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: 'localhost',
      });

      const event = {
        event: GoogleAnalyticsEvents.GAME_START,
        projectTitle: getFakeSentence(),
      } as const;

      trackEvent(event);

      expect(window.dataLayer).toBeUndefined();
    });

    it('should track event if dataLayer is NOT defined yet', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: getFakeDomainWord(),
      });

      const event = {
        event: GoogleAnalyticsEvents.GAME_RESTART,
        projectTitle: getFakeSentence(),
      } as const;

      trackEvent(event);

      expect(window.dataLayer).toEqual([event]);
    });

    it('should track event if dataLayer is defined', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: getFakeDomainWord(),
      });

      const currentDataLayer = [
        {
          event: GoogleAnalyticsEvents.GAME_START,
          projectTitle: getFakeSentence(),
        },
      ];

      window.dataLayer = [...currentDataLayer];

      const event = {
        event: GoogleAnalyticsEvents.GAME_END_AUTO,
        projectTitle: getFakeSentence(),
        gameScore: getFakeNumber({ min: 0 }),
      } as const;

      trackEvent(event);

      expect(window.dataLayer).toEqual([...currentDataLayer, event]);
    });
  });
});
