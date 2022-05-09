import { AntDesign } from '@expo/vector-icons';
import React, { ReactElement } from 'react';
import {
  KeyboardAvoidingView,
  Modal, Text, TouchableOpacity, View,
} from 'react-native';
import Styles from '../../Styles/Styles';
import { ModalProps } from '../../types';

type Props = {
  props: ModalProps & {
    showHeader?: boolean;
    title?: string;
    fullScreen?: boolean;
    closable?: boolean;
    wide?: boolean;
  },
  children: Element | ReactElement | Element[] | ReactElement[],
};

export default function ModalContainer({ props, children }: Props) {
  const isFullscreen = (): boolean => props?.fullScreen ?? false;

  const isWide = (): boolean => props?.wide ?? false;

  const isClosable = (): boolean => props?.closable ?? true;

  const showHeader = (): boolean => {
    if (props?.showHeader !== undefined) {
      return props.showHeader;
    }

    return !!props?.title || isClosable();
  };

  const closeModal = () => {
    if (!isClosable()) {
      return;
    }

    props.onClose();
  };

  const backgroundStyles = {
    ...Styles.flex1,
    ...Styles.bgModal,
    ...Styles.wFull,
    ...Styles.hFull,
    ...(isFullscreen() ? {
      ...Styles.itemsEnd,
      ...Styles.justifyEnd,
    } : {
      ...Styles.itemsCenter,
      ...Styles.justifyCenter,
    }),
  };

  const wrapperStyles = {
    ...Styles.bgWhite,
    ...(isFullscreen() ? {
      ...Styles.h90,
      ...Styles.wFull,
      ...Styles.pb6,
      ...Styles.roundedTopLg,
    } : {
      ...Styles.itemsCenter,
      ...Styles.justifyCenter,
      width: 300,
    }),
    ...(isWide() ? { width: '90%' } : {}),
  };

  const headerStyles = {
    ...Styles.p4,
    ...Styles.bgBlue,
    ...Styles.flexRow,
    ...Styles.justifyBetween,
    ...Styles.itemsCenter,
    zIndex: 9999,
    ...(isFullscreen() ? {
      ...Styles.wFull,
      ...Styles.roundedTopLg,
    } : {
      width: 300,
    }),
    ...(isWide() ? { width: '100%' } : {}),
  };

  // @ts-ignore
  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => closeModal()}
      transparent
    >
      <View style={backgroundStyles}>
        <View style={wrapperStyles}>
          {showHeader() && (
            <View style={headerStyles}>
              <Text style={{ ...Styles.textLg }}>{props.title}</Text>
              {isClosable() && (
              <TouchableOpacity onPress={() => closeModal()}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              )}
            </View>
          )}
          <View>
            <KeyboardAvoidingView behavior="position">
              {children}
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </Modal>
  );
}
