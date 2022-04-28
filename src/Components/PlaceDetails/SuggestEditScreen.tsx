import {
  KeyboardAvoidingView, ScrollView, Text, View,
} from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import TitleBar from './UI/TitleBar';
import Styles from '../../Styles/Styles';

type Props = {
  route: RouteProp<{
    params: {
      eateryId: number,
      eateryName: string,
    }
  }>
  navigation: StackNavigationProp<any>
};

export default function SuggestEditScreen(props: Props) {
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">

        <TitleBar props={{
          isLoading: false,
          navigation: props.navigation,
          placeName: 'Suggest Edits',
        }}
        />

        <View style={{ ...Styles.p2, ...Styles.mt10 }}>
          <Text>Hello There</Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
