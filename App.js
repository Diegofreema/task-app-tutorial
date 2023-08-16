import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message';
import { NativeBaseProvider } from 'native-base';
import Main from './Main';
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <StatusBar style="auto" />
        <Main />
        <Toast />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
