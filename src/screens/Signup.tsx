import React, {useState} from 'react';
import {Text, TextInput, Button} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import RadioForm from 'react-native-simple-radio-button';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {signupUser} from '../actions/auth';

type FormData = {
  fullName: string;
  email: string;
  mobile: number;
  password: string;
  confirmPassword: string;
};

const radio_props = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

function Signup() {
  const [gender, setGender] = useState('male');
  const {control, handleSubmit, errors, watch, getValues} = useForm<FormData>();
  let pwd = watch('password');
  const onSubmit = data => {
    const {fullName, email, mobile, password, confirmPassword} = data;
    signupUser({fullName, email, mobile, password, gender});
  };

  return (
    <ScrollView style={styles.containerViewStyle}>
      <Text style={styles.textLabelStyle}>Full name</Text>
      <Controller
        as={<TextInput style={styles.textInputStyle} />}
        control={control}
        name="fullName"
        onChange={args => args[0].nativeEvent.text}
        rules={{required: 'Full name required'}}
        defaultValue=""
      />
      {errors.fullName && (
        <Text style={styles.errorTextStyle}>{errors.fullName.message}</Text>
      )}
      <Text style={styles.textLabelStyle}>Mobile</Text>
      <Controller
        as={
          <TextInput style={styles.textInputStyle} keyboardType="number-pad" />
        }
        control={control}
        name="mobile"
        onChange={args => args[0].nativeEvent.text}
        rules={{required: 'Mobile number required'}}
        defaultValue=""
      />
      {errors.mobile && (
        <Text style={styles.errorTextStyle}>{errors.mobile.message}</Text>
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
        rules={{
          required: 'Email required',
        }}
        defaultValue=""
      />
      {errors.email && (
        <Text style={styles.errorTextStyle}>{errors.email.message}</Text>
      )}
      <Text style={styles.textLabelStyle}>Password</Text>
      <Controller
        as={<TextInput style={styles.textInputStyle} secureTextEntry={true} />}
        control={control}
        name="password"
        onChange={args => args[0].nativeEvent.text}
        rules={{
          required: 'Password required',
          validate: value =>
            value.length >= 6 ? true : 'Password must be at least 6 characters',
        }}
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.errorTextStyle}>{errors.password.message}</Text>
      )}
      <Text style={styles.textLabelStyle}>Confirm Password</Text>
      <Controller
        as={<TextInput style={styles.textInputStyle} secureTextEntry={true} />}
        control={control}
        name="confirmPassword"
        onChange={args => args[0].nativeEvent.text}
        rules={{
          required: 'Confirm password required',
          validate: value =>
            value === getValues()['password']
              ? true
              : 'Password does not match',
        }}
        defaultValue=""
      />
      {errors.confirmPassword && (
        <Text style={styles.errorTextStyle}>
          {errors.confirmPassword.message}
        </Text>
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
const mapStateToProps = ({authReducer}) => {
  const {authError, user} = authReducer;
  return {
    user,
  };
};

// const mapDispatchToProps = {
//   signupUser,
// };

const mapDispatchToProps = dispatch => {
  return {
    signupUser: () => dispatch(signupUser),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
