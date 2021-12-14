import { StyleSheet } from 'react-native';
import {
  BLUE, BLUE_LIGHT, GREY_LIGHT, GREY_OFF, WHITE, YELLOW, GREY,
} from '../constants';

const globalStyles = StyleSheet.create({
  bgBlue: { backgroundColor: BLUE },
  bgBlueLight: { backgroundColor: BLUE_LIGHT },
  bgGreyLight: { backgroundColor: GREY_LIGHT },
  bgYellow: { backgroundColor: YELLOW },
  bgWhite: { backgroundColor: WHITE },

  borderGrey: { borderColor: GREY },
  borderGreyOff: { borderColor: GREY_OFF },
  borderBottom: { borderBottomWidth: 1 },
  borderTop: { borderTopWidth: 1 },

  flex1: { flex: 1 },
  flexRow: { flexDirection: 'row' },

  fontSemibold: { fontWeight: '600' },

  hFull: { height: '100%' },

  itemsEnd: { alignItems: 'flex-end' },
  itemsCenter: { alignItems: 'center' },

  mb2: { marginBottom: 8 },
  mb4: { marginBottom: 16 },
  mr1: { marginRight: 4 },
  mr2: { marginRight: 8 },
  mt2: { marginTop: 8 },
  mt4: { marginTop: 16 },

  mx1: { marginRight: 4, marginLeft: 4 },

  my4: { marginTop: 16, marginBottom: 16 },

  p2: { padding: 8 },
  p4: { padding: 16 },

  pt2: { paddingTop: 8 },

  px4: { paddingLeft: 16, paddingRight: 16 },

  rounded: { borderRadius: 8 },

  textLg: { fontSize: 16 },
  textWhite: { color: WHITE },

  w20: { width: '20%' },
  w80: { width: '80%' },
});

export default globalStyles;
