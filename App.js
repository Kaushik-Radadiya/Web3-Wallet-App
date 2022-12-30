import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import * as React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function App() {
  const connector = useWalletConnect();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#010A2B'} barStyle="light-content" />
      <ImageBackground
        source={require('./assets/background.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>
            {connector.connected ? 'Wallet Address' : 'Wallet Messenger'}
          </Text>
          {connector.connected && connector?.accounts[0] && (
            <Text style={styles.walletAddress}>{connector?.accounts[0]}</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              connector.connected
                ? connector.killSession()
                : connector.connect()
            }>
            <Text style={styles.buttonText}>
              {connector.connected ? 'Disconnect Wallet' : 'Connect Wallet'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010A2B',
  },
  backgroundImage: {
    flex: 1,
  },
  logoContainer: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 210,
  },
  logoText: {
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 22,
    color: '#FFFFFF',
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1.5,
  },
  walletAddress: {
    paddingVertical: 10,
    marginHorizontal: 20,
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 22,
    color: '#cbfcbf',
  },
  button: {
    backgroundColor: '#1F81E1',
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 70,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
  },
});

export default withWalletConnect(App, {
  redirectUrl: Platform.OS === 'web' ? window.location.origin : 'walletweb3://',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
