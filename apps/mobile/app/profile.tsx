import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSessionStore } from '../src/state/session';

export default function ProfileScreen() {
  const user = useSessionStore((s) => s.user);
  const role = useSessionStore((s) => s.role);
  const setRole = useSessionStore((s) => s.setRole);
  const clearSession = useSessionStore((s) => s.clearSession);

  function switchRole() {
    setRole(role === 'rider' ? 'driver' : 'rider');
    router.replace('/');
  }

  function logout() {
    clearSession();
    router.replace('/(auth)/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.name ?? 'Profile'}</Text>
      <Text style={styles.subtitle}>{user?.email}</Text>
      <Pressable style={styles.button} onPress={switchRole}>
        <Text style={styles.buttonText}>Switch to {role === 'rider' ? 'driver' : 'rider'} mode</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.logout]} onPress={logout}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#666', marginBottom: 24 },
  button: { backgroundColor: '#111', borderRadius: 8, padding: 14, alignItems: 'center', width: '100%' },
  logout: { backgroundColor: '#c00' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
