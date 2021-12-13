import { StyleSheet } from 'react-native';
import {
  BLUE, BLUE_LIGHT, GREY_LIGHT, GREY_OFF, WHITE, YELLOW,
} from '../constants';

const globalStyles = StyleSheet.create({
  bgBlue: { backgroundColor: BLUE },
  bgBlueLight: { backgroundColor: BLUE_LIGHT },
  bgGreyLight: { backgroundColor: GREY_LIGHT },
  bgYellow: { backgroundColor: YELLOW },
  bgWhite: { backgroundColor: WHITE },

  borderGreyOff: { borderColor: GREY_OFF },
  borderBottom: { borderBottomWidth: 1 },

  flex1: { flex: 1 },
  flexRow: { flexDirection: 'row' },

  fontSemibold: { fontWeight: '600' },

  itemsEnd: { alignItems: 'flex-end' },

  mb2: { marginBottom: 8 },
  mb4: { marginBottom: 16 },
  mr1: { marginRight: 4 },
  mt2: { marginTop: 8 },

  p2: { padding: 8 },

  pt2: { paddingTop: 8 },

  rounded: { borderRadius: 8 },

  textLg: { fontSize: 16 },
  textWhite: { color: WHITE },

  w20: { width: '20%' },
  w80: { width: '80%' },
});

export default globalStyles;
