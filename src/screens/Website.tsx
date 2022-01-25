import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View,
} from 'react-native';
import Styles from '../Styles/Styles';
import { ApiService } from '../libs/ApiService';
import { BASE_URL } from '../constants';
import { WebsiteDataset, WebsiteDisplaySection, WebsiteModuleData } from '../types';
import WebsiteItem from '../Components/Website/WebsiteItem';
import ShopCtaComponent from '../Components/UI/ShopCtaComponent';
import AnalyticsService from '../libs/AnalyticsService';

export default function Website() {
  AnalyticsService.logScreen('website-screen').then(() => {});

  const [loadingBlogs, setLoadingBlogs]: [boolean, any] = useState(true);
  const [blogs, setBlogs]: [WebsiteDataset[], any] = useState([]);
  const [loadingRecipes, setLoadingRecipes]: [boolean, any] = useState(true);
  const [recipes, setRecipes]: [WebsiteDataset[], any] = useState([]);
  const [loadingReviews, setLoadingReviews]: [boolean, any] = useState(true);
  const [reviews, setReviews]: [WebsiteDataset[], any] = useState([]);

  const [activeItems, setActiveItems]: [{ [K: string]: number }, any] = useState(() => ({
    blogs: 0,
    recipes: 0,
    reviews: 0,
  }));

  const sections: WebsiteDisplaySection[] = [
    {
      title: 'Latest Blogs',
      key: 'blogs',
      loading: loadingBlogs,
      items: blogs,
    }, {
      title: 'Latest Recipes',
      key: 'recipes',
      loading: loadingRecipes,
      items: recipes,
    }, {
      title: 'Latest Reviews',
      key: 'reviews',
      loading: loadingReviews,
      items: reviews,
    },
  ];

  const loadBlogs = () => {
    ApiService.latestBlogs().then((response) => {
      setBlogs(response.data.data.data.map((blog: WebsiteModuleData) => ({
        id: blog.id,
        title: blog.title,
        description: blog.meta_description,
        image: blog.main_image,
        createdAt: blog.created_at,
        link: `${BASE_URL}${blog.link}`,
      })));

      setLoadingBlogs(false);
    });
  };

  const loadRecipes = () => {
    ApiService.latestRecipes().then((response) => {
      setRecipes(response.data.data.data.map((recipe: WebsiteModuleData) => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.meta_description,
        image: recipe.main_image,
        createdAt: recipe.created_at,
        link: `${BASE_URL}${recipe.link}`,
      })));

      setLoadingRecipes(false);
    });
  };

  const loadReviews = () => {
    ApiService.latestReviews().then((response) => {
      setReviews(response.data.data.data.map((review: WebsiteModuleData) => ({
        id: review.id,
        title: review.architect_title,
        description: review.meta_description,
        image: review.main_image,
        createdAt: review.created_at,
        link: `${BASE_URL}${review.link}`,
      })));

      setLoadingReviews(false);
    });
  };

  const scrollEnded = (key: 'blogs' | 'recipes' | 'reviews', event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const itemWidth = event.nativeEvent.contentSize.width / 12;
    const itemIndex = event.nativeEvent.contentOffset.x / itemWidth;

    setActiveItems((prevState: { [K: string]: number }) => ({
      ...prevState,
      [key]: itemIndex,
    }));

    AnalyticsService.logEvent({
      type: 'scrolled_website_items',
      metaData: {
        section: key,
        visibleItemIndex: itemIndex,
      },
    }).then(() => {});
  };

  useEffect(() => {
    loadBlogs();
    loadRecipes();
    loadReviews();
  }, []);

  return (
    <ScrollView style={{ ...Styles.bgWhite, ...Styles.flex1, ...Styles.p2 }}>

      <Text style={{ ...Styles.textLg, ...Styles.mb4 }}>
        Coeliac Sanctuary is more than our eating out guide, over on the main Coeliac Sanctuary
        website we're regularly posting new blogs, recipes and reviews, why not check out our
        newest ones below!
      </Text>

      {sections.map((section) => (
        <>
          <View
            key={section.key}
            style={{
              ...Styles.border,
              ...Styles.borderBlue,
              ...Styles.roundedLg,
              ...Styles.my4,
            }}
          >
            <View style={{
              ...Styles.bgBlue,
              ...Styles.p2,
              ...Styles.roundedTopLg,
            }}
            >
              <Text style={{
                ...Styles.textWhite,
                ...Styles.textXl,
                ...Styles.fontSemibold,
              }}
              >
                {section.title}
              </Text>
            </View>

            {section.loading && <ActivityIndicator size="large" style={Styles.my4} />}

            {!section.loading && (
              <>
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={(event) => scrollEnded(section.key, event)}
                  contentContainerStyle={{
                    width: '1200%',
                  }}
                >
                  {section.items.map((item) => (
                    <WebsiteItem item={item} key={item.id.toString()} />
                  ))}
                </ScrollView>
                <View style={{
                  ...Styles.flexRow,
                  ...Styles.justifyCenter,
                  ...Styles.my4,
                }}
                >
                  {section.items.map((item, index) => (
                    <View
                      key={item.id.toString()}
                      style={{
                        width: 10,
                        height: 10,
                        ...Styles.border,
                        ...Styles.borderGreyOff,
                        ...Styles.rounded,
                        ...Styles.mx1,
                        ...(activeItems[section.key] === index ? Styles.bgGreyOff : Styles.bgWhite),
                      }}
                    />
                  ))}
                </View>
              </>
            )}
          </View>

          {section.key === 'blogs' && <ShopCtaComponent />}
        </>
      ))}
    </ScrollView>
  );
}
