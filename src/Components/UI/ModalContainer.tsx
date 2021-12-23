import { AntDesign } from '@expo/vector-icons';
import React, { ReactElement } from 'react';
import {
  Modal, Text, TouchableOpacity, View,
} from 'react-native';
import Global from '../../Styles/Global';
import { ModalProps } from '../../types';

type Props = {
  props: ModalProps & {
    showHeader?: boolean;
    title?: string;
    fullScreen?: boolean;
    closable?: boolean;
  },
  children: Element | ReactElement | Element[] | ReactElement[],
};

export default function ModalContainer({ props, children }: Props) {
  const isFullscreen = (): boolean => props?.fullScreen ?? false;

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
    ...Global.flex1,
    ...Global.bgModal,
    ...Global.wFull,
    ...Global.hFull,
    ...(isFullscreen() ? {
      ...Global.itemsEnd,
      ...Global.justifyEnd,
    } : {
      ...Global.itemsCenter,
      ...Global.justifyCenter,
    }),
  };

  const wrapperStyles = {
    ...Global.bgWhite,
    ...(isFullscreen() ? {
      ...Global.h90,
      ...Global.wFull,
      ...Global.pb6,
      ...Global.roundedTopLg,
    } : {
      ...Global.wAuto,
      ...Global.itemsCenter,
      ...Global.justifyCenter,
    }),
  };

  const headerStyles = {
    ...Global.p4,
    ...Global.bgBlue,
    ...Global.flexRow,
    ...Global.justifyBetween,
    ...Global.itemsCenter,
    ...(isFullscreen() ? {
      ...Global.wFull,
      ...Global.roundedTopLg,
    } : {
      width: 200,
    }),
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
              <Text style={{ ...Global.textLg }}>{props.title}</Text>
              {isClosable() && (
              <TouchableOpacity onPress={() => closeModal()}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              )}
            </View>
          )}
          <View>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
}
