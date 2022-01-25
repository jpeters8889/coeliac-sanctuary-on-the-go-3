import { Linking } from 'react-native';
import AnalyticsService from './AnalyticsService';

export default class LinkService {
  static async openLink(link: string) {
    await AnalyticsService.logEvent({
      type: 'open_link',
      metaData: { link },
    });

    return Linking.openURL(link);
  }
}
