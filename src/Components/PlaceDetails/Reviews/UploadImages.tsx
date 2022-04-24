import {
  ActivityIndicator,
  Platform, Text, TouchableOpacity, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AxiosResponse } from 'axios';
import Styles from '../../../Styles/Styles';
import { BLUE, GREY, GREY_OFF } from '../../../constants';
import { ApiService } from '../../../libs/ApiService';
import ScaledImage from '../../UI/ScaledImage';

type Image = {
  loading: boolean;
  id?: string;
  url?: string;
};

export default function UploadImages() {
  const [images, setImages]: [Image[], any] = useState([]);

  const selectImages = (): void => {
    setImages((img: Image[]) => [
      ...img,
      { loading: true },
    ]);

    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');

        return;
      }

      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        base64: false,
        exif: false,
      }).then(async (response) => {
        if (response.cancelled) {
          return;
        }

        const upload: AxiosResponse = await ApiService.uploadPhoto(response);

        if (upload.status === 422) {
          alert('Sorry, there was an error uploading this image');
        }

        setImages((img: Image[]) => {
          const newImages: Image[] = img.map((image) => image);

          const lastIndex = newImages.length - 1;

          newImages[lastIndex] = {
            loading: false,
            id: upload.data.images[0].id,
            url: upload.data.images[0].path,
          };

          return newImages;
        });
      });
    })();
  };

  useEffect(() => console.log(images), [images]);

  return (
    <View>
      <Text style={{ ...Styles.textBlueDark, ...Styles.fontSemibold, ...Styles.mb1 }}>
        Do you want to upload up to six (6) images with your review?
      </Text>

      <View style={{
        ...Styles.border, ...Styles.borderBlue, ...Styles.roundedSm, ...Styles.flexRow, ...Styles.flexWrap,
      }}
      >
        {images.map((image, index) => (
          <TouchableOpacity style={{ ...Styles.w33 }} key={index}>
            <View style={{
              aspectRatio: 1,
              position: 'relative',
              ...Styles.m2,
              ...Styles.border,
              ...Styles.borderBlue,
              ...Styles.roundedSm,
              ...Styles.itemsCenter,
              ...Styles.justifyCenter,
            }}
            >
              {image.loading && <ActivityIndicator size="large" color={BLUE} />}
              {!image.loading && image.url && <ScaledImage image={image.url} constrain={1} />}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={{ ...Styles.w33 }} onPress={selectImages}>
          <View style={{
            aspectRatio: 1,
            position: 'relative',
            ...Styles.m2,
            ...Styles.border,
            ...Styles.borderBlue,
            ...Styles.roundedSm,
            ...Styles.itemsCenter,
            ...Styles.justifyCenter,
          }}
          >
            <Feather name="image" size={72} color={GREY_OFF} style={Styles.absolute} />
            <FontAwesome name="plus" size={40} color={GREY} style={Styles.absolute} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
