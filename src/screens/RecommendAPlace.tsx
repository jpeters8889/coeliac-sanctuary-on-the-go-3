import React, { useEffect, useState } from 'react';
import {
  Text, ScrollView, View, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Styles from '../Styles/Styles';
import { BLUE } from '../constants';
import ItemSeparator from '../Components/UI/ItemSeparator';
import { ApiService } from '../libs/ApiService';

export default function RecommendAPlace({ navigation }: { navigation: DrawerNavigationProp<any> }) {
  const [name, setName]: [string, any] = useState('');
  const [email, setEmail]: [string, any] = useState('');
  const [placeName, setPlaceName]: [string, any] = useState('');
  const [placeLocation, setPlaceLocation]: [string, any] = useState('');
  const [placeWebAddress, setPlaceWebAddress]: [string, any] = useState('');
  const [placeDetails, setPlaceDetails]: [string, any] = useState('');

  const [errors, setErrors]: [{ [K: string]: boolean }, any] = useState({
    name: false,
    email: false,
    placeName: false,
    placeLocation: false,
    placeDetails: false,
  });

  const submit = () => {
    const errorObject: { [K: string]: boolean } = {
      name: name === '',
      email: email === '',
      placeName: placeName === '',
      placeLocation: placeLocation === '',
      placeDetails: placeDetails === '',
    };

    setErrors(errorObject);

    if (Object.values(errorObject).filter((value: boolean) => value).length !== 0) {
      Alert.alert('Please check all details and try again!');

      return;
    }

    ApiService.recommendAPlace({
      name, email, placeName, placeLocation, placeWebAddress, placeDetails,
    }).then(() => {
      Alert.alert('Thank you for your recommendation, we\'ll check it out');
      navigation.goBack();
    }).catch(() => {
      Alert.alert('There was an error submitting your recommendation');
    });
  };

  return (
    <ScrollView style={{ ...Styles.bgWhite, ...Styles.flex1, ...Styles.p2 }}>
      <View>
        <Text style={{ ...Styles.textLg, ...Styles.mb4 }}>
          Do you know a place that needs adding to our guide? Well give us as much details as possible
          below and we'll check it out, verify it and get it added to our list!
        </Text>

        <Text style={{ ...Styles.textLg, ...Styles.mb4 }}>
          We rely on people like you providing us with information on places where people can eat out
          safely and helping us create a great eating out guide!
        </Text>

        <Text style={{ ...Styles.textLg, ...Styles.mb4 }}>
          Our eating out guide is full of independent eateries around the UK and Ireland, and we list
          nationwide chains, such as Nando's, Bella Italia in a separate area of our app and website.
        </Text>
      </View>

      <View>
        <View>
          <TextInput
            placeholder="Your Name..."
            placeholderTextColor={BLUE}
            value={name}
            style={{
              ...Styles.p2,
              ...Styles.textLg,
              ...Styles.border,
              ...Styles.bgBlueLightFaded,
              ...Styles.roundedSm,
              ...(errors.name ? Styles.borderRed : Styles.borderBlue),
            }}
            onChangeText={setName}
          />
        </View>

        <View style={Styles.my4}>
          <TextInput
            placeholder="Your Email..."
            placeholderTextColor={BLUE}
            value={email}
            autoCompleteType="email"
            keyboardType="email-address"
            style={{
              ...Styles.p2,
              ...Styles.textLg,
              ...Styles.border,
              ...Styles.bgBlueLightFaded,
              ...Styles.roundedSm,
              ...(errors.email ? Styles.borderRed : Styles.borderBlue),
            }}
            onChangeText={setEmail}
          />
        </View>

        <ItemSeparator />

        <View style={Styles.mt4}>
          <TextInput
            placeholder="Place Name..."
            placeholderTextColor={BLUE}
            value={placeName}
            style={{
              ...Styles.p2,
              ...Styles.textLg,
              ...Styles.border,
              ...Styles.bgBlueLightFaded,
              ...Styles.roundedSm,
              ...(errors.placeName ? Styles.borderRed : Styles.borderBlue),
            }}
            onChangeText={setPlaceName}
          />
        </View>

        <View style={Styles.mt4}>
          <TextInput
            multiline
            placeholder="Place Location / Address..."
            placeholderTextColor={BLUE}
            value={placeLocation}
            style={{
              ...Styles.p2,
              ...Styles.textLg,
              ...Styles.border,
              ...Styles.bgBlueLightFaded,
              ...Styles.roundedSm,
              ...(errors.placeLocation ? Styles.borderRed : Styles.borderBlue),
              height: 100,
            }}
            onChangeText={setPlaceLocation}
          />
        </View>

        <View style={Styles.mt4}>
          <TextInput
            placeholder="Place Web Address"
            placeholderTextColor={BLUE}
            value={placeWebAddress}
            style={{
              ...Styles.p2,
              ...Styles.textLg,
              ...Styles.border,
              ...Styles.borderBlue,
              ...Styles.bgBlueLightFaded,
              ...Styles.roundedSm,
            }}
            onChangeText={setPlaceWebAddress}
          />
        </View>

        <View style={Styles.mt4}>
          <TextInput
            multiline
            placeholder="Place Details"
            placeholderTextColor={BLUE}
            value={placeDetails}
            style={{
              ...Styles.p2,
              ...Styles.textLg,
              ...Styles.border,
              ...Styles.bgBlueLightFaded,
              ...Styles.roundedSm,
              ...(errors.placeDetails ? Styles.borderRed : Styles.borderBlue),
              height: 150,
            }}
            onChangeText={setPlaceDetails}
          />
        </View>

        <View style={{
          ...Styles.my4,
          ...Styles.flexRow,
          ...Styles.justifyCenter,
        }}
        >
          <TouchableOpacity onPress={() => submit()}>
            <View style={{
              ...Styles.p4,
              ...Styles.px16,
              ...Styles.bgYellow,
              ...Styles.roundedSm,
            }}
            >
              <Text style={Styles.textXl}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
