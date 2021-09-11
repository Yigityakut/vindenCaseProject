import React, {FC, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import TextInput from '../components/TextInput';
import {dp} from '../helpers/DevicePixels';
import CheckBox from '@react-native-community/checkbox';
import GradientButton from '../components/GradientButton';
import {Colors} from '../assets/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, updateCartItem} from '../redux/actions/CartActions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../components/Text';
import LoadingAnimation from '../components/LoadingAnimation';
import {RootState} from '../redux/reducers/rootReducer';
import {setIsLoading} from '../redux/actions/AppActions';
import Toast from 'react-native-toast-message';
import {AddToCartNavigationProps, CartInterface} from '../types';
import {calculatePrice} from '../helpers/Utils';

const AddToCartScreen: FC<AddToCartNavigationProps> = ({route, navigation}) => {
  const isEditing = route.params ? true : false;
  const item: CartInterface = isEditing
    ? route.params.item
    : {
        id: Math.floor(Math.random() * 100000),
        title: '',
        description: '',
        dimensions: {
          width: 0,
          height: 0,
          depth: 0,
        },
        unmountingWanted: false,
      };

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state: RootState) => state.app);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [width, setWidth] = useState(
    isEditing ? item.dimensions.width.toString() : '',
  );
  const [height, setHeight] = useState(
    isEditing ? item.dimensions.height.toString() : '',
  );
  const [depth, setDepth] = useState(
    isEditing ? item.dimensions.depth.toString() : '',
  );
  const [unmounting, setUnmounting] = useState(item.unmountingWanted);

  function submit() {
    let error = validateForm();
    if (error != '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: error,
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: dp(20),
      });
      return;
    }
    Keyboard.dismiss();

    dispatch(setIsLoading(true));
    if (isEditing) {
      dispatch(
        updateCartItem({
          id: item.id,
          title,
          description,
          dimensions: {
            width: parseInt(width),
            height: parseInt(height),
            depth: parseInt(depth),
          },
          unmountingWanted: unmounting,
        }),
      );
    } else {
      dispatch(
        addToCart({
          id: item.id,
          title,
          description,
          dimensions: {
            width: parseInt(width),
            height: parseInt(height),
            depth: parseInt(depth),
          },
          unmountingWanted: unmounting,
        }),
      );
    }
    // timeout added to show off animation
    setTimeout(() => {
      navigation.pop();
      dispatch(setIsLoading(false));
      Toast.show({
        type: 'success',
        position: 'top',
        text1: isEditing
          ? 'Cart item updated successfully!'
          : 'New item added successfully',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: dp(20),
      });
    }, 2000);
  }

  function validateForm() {
    let error = '';
    if (title == '') {
      error = 'Please enter a title';
    } else if (description == '') {
      error = 'Please enter a description';
    } else if (width == '' || width == '0') {
      error = 'Please enter width';
    } else if (height == '' || height == '0') {
      error = 'Please enter height';
    } else if (depth == '' || depth == '0') {
      error = 'Please enter depth';
    }
    return error;
  }

  function calculate() {
    return calculatePrice(
      parseInt(width),
      parseInt(height),
      parseInt(depth),
      unmounting,
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={val => setTitle(val)}
        placeholder={'Title'}
      />
      <TextInput
        value={description}
        onChangeText={val => setDescription(val)}
        placeholder={'Description'}
      />
      <TextInput
        value={width}
        keyboardType={'decimal-pad'}
        onChangeText={val => setWidth(val)}
        placeholder={'Width (cm)'}
      />
      <TextInput
        value={height}
        keyboardType={'decimal-pad'}
        onChangeText={val => setHeight(val)}
        placeholder={'Height (cm)'}
      />
      <TextInput
        value={depth}
        keyboardType={'decimal-pad'}
        onChangeText={val => setDepth(val)}
        placeholder={'Depth(cm)'}
      />
      <View style={styles.unmountingContainer}>
        <Text>Unmounting/Mounting Service</Text>
        <CheckBox
          tintColors={{true: Colors.orange}}
          value={unmounting}
          onValueChange={val => setUnmounting(val)}
        />
      </View>
      <Text
        style={{
          marginTop: dp(8),
          alignSelf: 'flex-end',
        }}>{`Total Price : ${calculate()} kr/month`}</Text>
      {isEditing ? (
        <GradientButton
          style={styles.submitButton}
          rightIcon={
            <Icon
              name="content-save-outline"
              color={Colors.white}
              size={dp(26)}
              style={styles.buttonIcon}
            />
          }
          onPress={submit}
          text={'Save changes'}
        />
      ) : (
        <GradientButton
          style={styles.submitButton}
          rightIcon={
            <Icon
              name="cart-plus"
              color={Colors.white}
              size={dp(26)}
              style={styles.buttonIcon}
            />
          }
          onPress={submit}
          text={'Add to cart'}
        />
      )}
      {isLoading && <LoadingAnimation color={Colors.orange} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: dp(20),
  },
  unmountingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: dp(6),
  },
  submitButton: {
    marginTop: dp(20),
  },
  buttonIcon: {
    paddingRight: dp(12),
  },
});
export default AddToCartScreen;
