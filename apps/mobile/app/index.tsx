import { Redirect } from 'expo-router';
import { useSessionStore } from '../src/state/session';

export default function Index() {
  const token = useSessionStore((s) => s.token);
  const role = useSessionStore((s) => s.role);

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href={role === 'driver' ? '/(driver)/home' : '/(rider)/request'} />;
}
