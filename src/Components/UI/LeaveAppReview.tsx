import { TouchableOpacity, Text, Platform } from 'react-native';
import React from 'react';
import Rate, { IConfig } from 'react-native-rate';
import Styles from '../../Styles/Styles';

export default function LeaveAppReview() {
  const options: IConfig = {
    AppleAppID: '1608694621',
    GooglePackageName: 'com.coeliacsanctuary.onthego',
    preferInApp: false,
    openAppStoreIfInAppFails: true,
  };

  return (
    <TouchableOpacity
      style={{
        ...Styles.bgYellow,
        ...Styles.mb4,
        ...Styles.py2,
        ...Styles.px4,
        ...Styles.rounded,
      }}
      onPress={() => Rate.rate(options)}
    >
      <Text style={{
        ...Styles.textCenter,
        ...Styles.textLg,
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
      }}
      >
        Are you enjoying our app? Please leave us a review!
      </Text>
    </TouchableOpacity>
  );
}
