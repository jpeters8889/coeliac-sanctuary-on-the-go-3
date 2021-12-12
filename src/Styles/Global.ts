import { StyleSheet } from 'react-native';
import { BLUE, BLUE_LIGHT, WHITE } from '../constants';

const globalStyles = StyleSheet.create({
  bgBlue: { backgroundColor: BLUE },
  bgBlueLight: { backgroundColor: BLUE_LIGHT },
  textLg: { fontSize: 16 },
  textWhite: { color: WHITE },
  fontSemibold: { fontWeight: '600' },
  mt2: { marginTop: 8 },
  pt2: { paddingTop: 8 },
});

export default globalStyles;
