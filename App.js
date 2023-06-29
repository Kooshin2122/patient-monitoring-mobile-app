//
import Root from './app/routes';
import { PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
//
export default function App() {
  return (
    <PaperProvider>
      <Root />
    </PaperProvider>
  );
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//