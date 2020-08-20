import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'react-native-elements';

function More({navigation}) {
  return (
    <View style={{flex: 1, marginTop: 50, alignItems: 'flex-start'}}>
      <Icon
        name="bars"
        type="font-awesome"
        iconStyle={{marginLeft: 20}}
        onPress={() => navigation.toggleDrawer()}
      />
    </View>
  );
}
export default More;
