import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../context/Login';

const SignInScreen = ({setDataInput}) => {
  const [token, setToken] = useState(null);
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  // useEffect(() => {
  //   const user = {email: data.email, password: data.password};
  //   axios
  //     .post('https://reqres.in/api/articles', user)
  //     .then(response => setToken(response.data));
  // }, []);

  const {signIn} = useContext(AuthContext);

  const textInputChange = text => {
    if (text.length !== 0) {
      setData({
        ...data,
        email: text,
        check_textInputChange: true,
      });
      setDataInput({...data, email: text});
    } else {
      setData({
        ...data,
        email: text,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = text => {
    setData({
      ...data,
      password: text,
    });
    setDataInput({...data, password: text});
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome to movie app!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textFooter}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="envelope" color={'#ffffff'} size={15} />
          <TextInput
            placeholder="Your email"
            placeholderTextColor="#fff"
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={text => {
              textInputChange(text);
            }}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.textFooter, {marginTop: 35}]}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color={'#ffffff'} size={20} />
          <TextInput
            secureTextEntry={data.secureTextEntry ? true : false}
            placeholder="Your password"
            placeholderTextColor="#fff"
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={text => {
              handlePasswordChange(text);
            }}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              signIn();
            }}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15212b',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#192734',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    color: '#fff',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -15,
    paddingLeft: 10,
    color: '#fff',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 15,
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
