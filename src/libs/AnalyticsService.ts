import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import { AnalyticsEvent } from '../types';

export default class AnalyticsService {
  protected hasConsent: boolean = true;

  constructor() {
    AnalyticsService.hasConsented().then((hasConsent) => {
      this.hasConsent = hasConsent;
    });

    // analytics()
    // .analytics().setClientId('53299243-1');
  }

  static logEvent(event: AnalyticsEvent) {
    const self = new AnalyticsService();

    return self.log(event);
  }

  static logScreen(name: string, metaData: { [K: string]: any } = {}) {
    const self = new AnalyticsService();

    return self.log({
      type: 'screen_view',
      metaData: {
        screen_name: name,
        ...metaData,
      },
    });
  }

  protected log(event: AnalyticsEvent) {
    if (!this.hasConsent) {
      return Promise.resolve();
    }

    return analytics().logEvent(event.type, event.metaData);
  }

  static async hasConsented(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem('@allow-analytics');

      if (!value) {
        return true;
      }

      return value === 'true';
    } catch (e) {
      return true;
    }
  }

  static async toggleAnalytics(value: boolean) {
    try {
      await AsyncStorage.setItem('@allow-analytics', value ? 'true' : 'false');
      await analytics().setAnalyticsCollectionEnabled(value);
    } catch (e) {
      // saving error
    }
  }
}
