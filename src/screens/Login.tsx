import React, {useState} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import RadioForm from 'react-native-simple-radio-button';
import {ScrollView} from 'react-native-gesture-handler';

type FormData = {
  fullName: string;
  email: string;
  mobile: number;
  password: string;
  confirmPassword: string;
};

const radio_props = [
  {label: 'Male', value: 0},
  {label: 'Female', value: 1},
  {label: 'Other', value: 2},
];

function Login() {
  const [gender, setGender] = useState(0);
  const {control, handleSubmit, errors} = useForm<FormData>();
  const onSubmit = data => {
    const {fullName, email, mobile, password, confirmPassword} = data;
    password === confirmPassword
      ? Alert.alert('Form Data', JSON.stringify(data))
      : Alert.alert('Password does not match');
  };

  return (
    <ScrollView style={styles.containerViewStyle}>
      <Text style={styles.textLabelStyle}>Full name</Text>
      <Controller
        as={<TextInput style={styles.textInputStyle} />}
        control={control}
        name="fullName"
        onChange={args => args[0].nativeEvent.text}
        rules={{required: true}}
        defaultValue=""
      />
      {errors.fullName && (
        <Text style={styles.errorTextStyle}>This is required.</Text>
      )}
      <Text style={styles.textLabelStyle}>Mobile</Text>
      <Controller
        as={
          <TextInput style={styles.textInputStyle} keyboardType="number-pad" />
        }
        control={control}
        name="mobile"
        onChange={args => args[0].nativeEvent.text}
        rules={{required: true}}
        defaultValue=""
      />
      {errors.mobile && (
        <Text style={styles.errorTextStyle}>This is required.</Text>
      )}
      <Text style={styles.textLabelStyle}>Email</Text>
      <Controller
        as={
          <TextInput
            style={styles.textInputStyle}
            keyboardType="email-address"
          />
        }
        control={control}
        name="email"
        onChange={args => args[0].nativeEvent.text}
        rules={{required: true}}
        defaultValue=""
      />
      {errors.email && (
        <Text style={styles.errorTextStyle}>This is required.</Text>
      )}
      <Text style={styles.textLabelStyle}>Password</Text>
      <Controller
        as={<TextInput style={styles.textInputStyle} secureTextEntry={true} />}
        control={control}
        name="password"
        onChange={args => args[0].nativeEvent.text}
        rules={{required: true}}
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.errorTextStyle}>This is required.</Text>
      )}
      <Text style={styles.textLabelStyle}>Confirm Password</Text>
      <Controller
        as={<TextInput style={styles.textInputStyle} secureTextEntry={true} />}
        control={control}
        name="confirmPassword"
        onChange={args => args[0].nativeEvent.text}
        rules={{required: true}}
        defaultValue=""
      />
      {errors.confirmPassword && (
        <Text style={styles.errorTextStyle}>This is required.</Text>
      )}

      <Text style={styles.textLabelStyle}>Gender</Text>
      <Controller
        as={
          <RadioForm
            radio_props={radio_props}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#50C900'}
            labelColor={'#000'}
            onPress={value => {
              console.log(value);
              setGender(value);
            }}
          />
        }
        control={control}
        name="gender"
        onChange={([selected]) => {
          setGender(selected);
          console.log(selected);
        }}
        labelStyle={{marginRight: 5}}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}

const styles = {
  containerViewStyle: {
    flex: 1,
    padding: 20,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 2,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'grey',
    autoCapitalize: 'none',
    autoCorrect: false,
    autoCompleteType: 'off',
  },
  textLabelStyle: {
    fontSize: 16,
  },
  errorTextStyle: {
    color: 'red',
  },
};
export default Login;
