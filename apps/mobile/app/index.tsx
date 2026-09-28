import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useSessionStore } from '../src/state/session';

export default function Index() {
  const hasHydrated = useSessionStore((s) => s.hasHydrated);
  const token = useSessionStore((s) => s.token);
  const role = useSessionStore((s) => s.role);

  if (!hasHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href={role === 'driver' ? '/(driver)/home' : '/(rider)/request'} />;
}
