import {
  ActivityIndicator, Text, TouchableOpacity, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AxiosResponse } from 'axios';
import { getInfoAsync } from 'expo-file-system';
import Styles from '../../../Styles/Styles';
import { BLUE, GREY, GREY_OFF } from '../../../constants';
import { ApiService } from '../../../libs/ApiService';
import ScaledImage from '../../UI/ScaledImage';

type Image = {
  loading: boolean;
  id?: string;
  url?: string;
};

type Props = {
  onChange: (images: Image[]) => void;
};

export default function UploadImages({ onChange }: Props) {
  const [images, setImages]: [Image[], any] = useState([]);
  const [longPressedOn, setLongPressedOn]: [number | null, any] = useState(null);

  const removeLastImage = (): void => {
    setImages((img: Image[]) => {
      if (img.length === 1) {
        return [];
      }

      img.pop();

      return img;
    });
  };

  const isImageValid = async (image: string): Promise<boolean> => {
    const info = await getInfoAsync(image);

    if (!info || !info.size) {
      return true;
    }

    return info.size < 5000000;
  };

  const hasPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');

      return false;
    }

    return true;
  };

  const selectImages = (): void => {
    (async () => {
      if (!await hasPermission()) {
        return;
      }

      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        base64: false,
        exif: false,
      });

      if (response.cancelled) {
        return;
      }

      if (!await isImageValid(response.uri)) {
        alert('Sorry, this image is too large, please select an image below 5mb in size.');

        return;
      }

      setImages((img: Image[]) => [
        ...img,
        { loading: true },
      ]);

      const upload: AxiosResponse = await ApiService.uploadPhoto(response);

      if (upload.status === 422) {
        let errorMessage = 'Sorry, there was an error uploading this image';

        if (upload?.data?.errors['images.0'][0] === 'validation.max.file') {
          errorMessage = 'Sorry, this image is too large, please select an image below 5mb in size.';
        }

        alert(errorMessage);

        removeLastImage();

        return;
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
    })();
  };

  const deleteImage = (index: number): void => {
    setLongPressedOn(null);

    setImages((img: Image[]) => img.filter((iImg, iIndex) => index !== iIndex));
  };

  const isLoading = (): boolean => images.filter((image) => image.loading).length > 0;

  useEffect(() => {
    onChange(images);
  }, [images]);

  return (
    <View>
      <Text style={{ ...Styles.textBlueDark, ...Styles.fontSemibold, ...Styles.mb1 }}>
        Do you want to upload up to six (6) images with your review?
      </Text>

      <View style={{
        ...Styles.border,
        ...Styles.borderBlue,
        ...Styles.roundedSm,
        ...Styles.flexRow,
        ...Styles.flexWrap,
        ...Styles.justifyStart,
      }}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            style={{ ...Styles.w33, ...Styles.p2 }}
            onLongPress={() => setLongPressedOn(index)}
            key={index}
          >
            <View style={{
              aspectRatio: 1,
              position: 'relative',
              ...Styles.flex1,
              ...Styles.border,
              ...Styles.borderBlue,
              ...Styles.roundedSm,
              ...Styles.itemsCenter,
              ...Styles.justifyCenter,
            }}
            >
              {image.loading && <ActivityIndicator size="large" color={BLUE} />}
              {!image.loading && image.url && (
              <>
                <ScaledImage image={image.url} constrain={1} />
                {longPressedOn === index && (
                <TouchableOpacity
                  style={{
                    ...Styles.absolute,
                    ...Styles.justifyCenter,
                    ...Styles.itemsCenter,
                    ...Styles.bgOverlay,
                    ...Styles.wFull,
                    ...Styles.hFull,
                    ...Styles.top0,
                  }}
                  onPress={() => deleteImage(index)}
                >
                  <FontAwesome5 name="times" size={60} color="red" />
                </TouchableOpacity>
                )}
              </>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {images.length < 6 && !isLoading() && (
        <TouchableOpacity style={{ ...Styles.w33, ...Styles.p2 }} onPress={selectImages}>
          <View style={{
            aspectRatio: 1,
            position: 'relative',
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
        )}
      </View>
    </View>
  );
}
