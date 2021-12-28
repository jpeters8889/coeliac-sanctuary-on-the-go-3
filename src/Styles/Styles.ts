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
  bgGreyOff: { backgroundColor: GREY_OFF },
  bgModal: { backgroundColor: 'rgba(0,0,0,0.8)' },

  borderGrey: { borderColor: GREY },
  borderGreyOff: { borderColor: GREY_OFF },
  borderBottom: { borderBottomWidth: 1 },
  borderTop: { borderTopWidth: 1 },

  flex1: { flex: 1 },
  flexRow: { flexDirection: 'row' },

  fontSemibold: { fontWeight: '600' },

  hFull: { height: '100%' },
  h90: { height: '90%' },

  itemsEnd: { alignItems: 'flex-end' },
  itemsCenter: { alignItems: 'center' },

  justifyBetween: { justifyContent: 'space-between' },
  justifyCenter: { justifyContent: 'center' },
  justifyEnd: { justifyContent: 'flex-end' },

  overflowHidden: { overflow: 'hidden' },

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
  pb6: { paddingBottom: 24 },

  px2: { paddingLeft: 8, paddingRight: 2 },
  px4: { paddingLeft: 16, paddingRight: 16 },
  px16: { paddingLeft: 64, paddingRight: 64 },

  py4: { paddingTop: 16, paddingBottom: 16 },
  py8: { paddingTop: 32, paddingBottom: 32 },

  rounded: { borderRadius: 8 },
  roundedLg: { borderRadius: 16 },

  roundedTopLg: { borderTopRightRadius: 16, borderTopLeftRadius: 16 },
  roundedBottomLg: { borderBottomRightRadius: 16, borderBottomLeftRadius: 16 },

  scale80: { transform: [{ scale: 0.8 }] },

  textCenter: { textAlign: 'center' },

  textLg: { fontSize: 16 },
  textXl: { fontSize: 20 },
  textWhite: { color: WHITE },

  w20: { width: '20%' },
  w80: { width: '80%' },
  wFull: { width: '100%' },
  wAuto: { width: 'auto' },
});

export default globalStyles;
