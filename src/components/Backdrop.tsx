import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

type Props = {
  onPress: () => void,
}

export function Backdrop(props: Props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={StyleSheet.absoluteFillObject} />
    </TouchableWithoutFeedback>
  );
}
