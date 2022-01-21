import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '../../Styles/Styles';
import { YELLOW } from '../../constants';

export default function MainHomeScreen() {
  return (
    <View style={{ ...Styles.bgWhite, ...Styles.flex1, ...Styles.p2 }}>
      <Text>Introductory Text?</Text>

      <Text>Shop CTA</Text>

      <View style={{
        ...Styles.border,
        ...Styles.borderBlue,
        ...Styles.roundedSm,
        ...Styles.my4,
      }}
      >
        <Text style={{
          ...Styles.p1,
          ...Styles.textLg,
          ...Styles.fontSemibold,
          ...Styles.bgBlueLightFaded,
          ...Styles.roundedTopSm,
          ...Styles.borderBottom,
          ...Styles.borderBlue,
        }}
        >
          Latest Location Ratings
        </Text>

        <Text style={Styles.p1}>
          Here are the latest places that have been rated on our app and website.
        </Text>

        <View>
          <View style={{
            ...Styles.flexRow,
            ...Styles.wFull,
            ...Styles.justifyBetween,
            ...Styles.p1,
            ...Styles.borderTop,
            ...Styles.borderBlue,
          }}
          >
            <View>
              <Text style={Styles.fontSemibold}>Foo, Crewe, Cheshire</Text>
              <Text style={Styles.textSm}>5 mins ago</Text>
            </View>
            <Text>
              <FontAwesome name="star" size={20} color={YELLOW} />
              <FontAwesome name="star" size={20} color={YELLOW} />
              <FontAwesome name="star" size={20} color={YELLOW} />
              <FontAwesome name="star" size={20} color={YELLOW} />
              <FontAwesome name="star" size={20} color={YELLOW} />
            </Text>
          </View>

          <View style={{
            ...Styles.flexRow,
            ...Styles.wFull,
            ...Styles.justifyBetween,
            ...Styles.p1,
            ...Styles.borderTop,
            ...Styles.borderBlue,
          }}
          >
            <View>
              <Text style={Styles.fontSemibold}>Bar, Stoke, Staffordshire</Text>
              <Text style={Styles.textSm}>2 hours ago</Text>
            </View>
            <Text>
              <FontAwesome name="star" size={20} color={YELLOW} />
              <FontAwesome name="star" size={20} color={YELLOW} />
              <FontAwesome name="star" size={20} color={YELLOW} />
            </Text>
          </View>

          <View style={{
            ...Styles.flexRow,
            ...Styles.wFull,
            ...Styles.justifyBetween,
            ...Styles.p1,
            ...Styles.borderTop,
            ...Styles.borderBlue,
          }}
          >
            <View>
              <Text style={Styles.fontSemibold}>Baz, Holyhead, Anglesey</Text>
              <Text style={Styles.textSm}>4 hours ago</Text>
            </View>
            <Text>
              <FontAwesome name="star" size={20} color={YELLOW} />
            </Text>
          </View>
        </View>
      </View>

      <Text>Latest Places</Text>
    </View>
  );
}
