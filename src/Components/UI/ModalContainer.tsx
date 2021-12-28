import { AntDesign } from '@expo/vector-icons';
import React, { ReactElement } from 'react';
import {
  Modal, Text, TouchableOpacity, View,
} from 'react-native';
import Style from '../../Styles/Styles';
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
    ...Style.flex1,
    ...Style.bgModal,
    ...Style.wFull,
    ...Style.hFull,
    ...(isFullscreen() ? {
      ...Style.itemsEnd,
      ...Style.justifyEnd,
    } : {
      ...Style.itemsCenter,
      ...Style.justifyCenter,
    }),
  };

  const wrapperStyles = {
    ...Style.bgWhite,
    ...(isFullscreen() ? {
      ...Style.h90,
      ...Style.wFull,
      ...Style.pb6,
      ...Style.roundedTopLg,
    } : {
      ...Style.wAuto,
      ...Style.itemsCenter,
      ...Style.justifyCenter,
    }),
  };

  const headerStyles = {
    ...Style.p4,
    ...Style.bgBlue,
    ...Style.flexRow,
    ...Style.justifyBetween,
    ...Style.itemsCenter,
    ...(isFullscreen() ? {
      ...Style.wFull,
      ...Style.roundedTopLg,
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
              <Text style={{ ...Style.textLg }}>{props.title}</Text>
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
