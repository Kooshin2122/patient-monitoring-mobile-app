//
import Root from './app/routes';
import AppContext from './app/context';
import { PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
//
export default function App() {
  return (
    <PaperProvider>
      <AppContext>
        <Root />
      </AppContext>
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