import { StyleSheet } from 'react-native';
import {
  BLUE, BLUE_LIGHT, GREY_LIGHT, GREY_OFF, WHITE, YELLOW, GREY, BLUE_LIGHT_FADED, BLUE_FADED,
} from '../constants';

const globalStyles = StyleSheet.create({
  absolute: { position: 'absolute' },

  bgBlue: { backgroundColor: BLUE },
  bgBlueFaded: { backgroundColor: BLUE_FADED },
  bgBlueLight: { backgroundColor: BLUE_LIGHT },
  bgBlueLightFaded: { backgroundColor: BLUE_LIGHT_FADED },
  bgGreyLight: { backgroundColor: GREY_LIGHT },
  bgYellow: { backgroundColor: YELLOW },
  bgWhite: { backgroundColor: WHITE },
  bgGreyOff: { backgroundColor: GREY_OFF },

  bgModal: { backgroundColor: 'rgba(0,0,0,0.8)' },
  borderGrey: { borderColor: GREY },
  borderGreyOff: { borderColor: GREY_OFF },
  borderBlue: { borderColor: BLUE },
  borderRed: { borderColor: 'red' },
  borderBlueLight: { borderColor: BLUE_LIGHT },
  borderBottom: { borderBottomWidth: 1 },

  border: { borderWidth: 1 },
  borderTop: { borderTopWidth: 1 },
  flex1: { flex: 1 },

  flexRow: { flexDirection: 'row' },

  fontSemibold: { fontWeight: '600' },
  fontBold: { fontWeight: '800' },

  hFull: { height: '100%' },

  h4: { height: 16 },
  h90: { height: '90%' },

  italic: { fontStyle: 'italic' },

  itemsEnd: { alignItems: 'flex-end' },

  itemsCenter: { alignItems: 'center' },
  justifyAround: { justifyContent: 'space-around' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyCenter: { justifyContent: 'center' },

  justifyEnd: { justifyContent: 'flex-end' },

  leadingHigh: { lineHeight: 20 },

  maxWFull: { maxWidth: '100%' },

  mb1: { marginBottom: 4 },
  mb2: { marginBottom: 8 },
  mb4: { marginBottom: 16 },
  mb8: { marginBottom: 32 },

  mr1: { marginRight: 4 },
  mr2: { marginRight: 8 },

  mt2: { marginTop: 8 },
  mt4: { marginTop: 16 },
  mt10: { marginTop: 40 },

  mx1: { marginRight: 4, marginLeft: 4 },

  my2: { marginTop: 8, marginBottom: 8 },
  my4: { marginTop: 16, marginBottom: 16 },

  overflowHidden: { overflow: 'hidden' },

  p1: { padding: 6 },
  p2: { padding: 8 },
  p4: { padding: 16 },

  pt2: { paddingTop: 8 },
  pr2: { paddingRight: 8 },
  pb6: { paddingBottom: 24 },

  px2: { paddingLeft: 8, paddingRight: 2 },
  px4: { paddingLeft: 16, paddingRight: 16 },
  px16: { paddingLeft: 64, paddingRight: 64 },

  py0: { paddingTop: 0, paddingBottom: 0 },
  py2: { paddingTop: 8, paddingBottom: 8 },
  py4: { paddingTop: 16, paddingBottom: 16 },
  py8: { paddingTop: 32, paddingBottom: 32 },

  right0: { right: 0 },

  roundedSm: { borderRadius: 6 },
  rounded: { borderRadius: 8 },
  roundedLg: { borderRadius: 16 },

  roundedTop: { borderTopRightRadius: 8, borderTopLeftRadius: 8 },
  roundedTopSm: { borderTopRightRadius: 6, borderTopLeftRadius: 6 },
  roundedTopLg: { borderTopRightRadius: 16, borderTopLeftRadius: 16 },
  roundedBottomLg: { borderBottomRightRadius: 16, borderBottomLeftRadius: 16 },

  scale60: { transform: [{ scale: 0.6 }] },
  scale80: { transform: [{ scale: 0.8 }] },
  scale120: { transform: [{ scale: 1.2 }] },

  textCenter: { textAlign: 'center' },

  textSm: { fontSize: 12 },
  textMd: { fontSize: 14 },
  textLg: { fontSize: 16 },
  textXl: { fontSize: 20 },
  text2Xl: { fontSize: 24 },
  textWhite: { color: WHITE },

  top0: { top: 0 },

  w20: { width: '20%' },
  w25: { width: '25%' },
  w80: { width: '80%' },
  w85: { width: '85%' },
  wFull: { width: '100%' },
  wAuto: { width: 'auto' },

  zMax: { zIndex: 999 },
});

export default globalStyles;
