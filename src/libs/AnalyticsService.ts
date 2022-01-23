import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AnalyticsService {
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
    } catch (e) {
      // saving error
    }
  }
}
