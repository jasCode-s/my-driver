import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { loginRequestSchema, type AuthResponse } from '@my-driver/shared';
import { apiFetch } from '../../src/api/client';
import { useSessionStore } from '../../src/state/session';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const setSession = useSessionStore((s) => s.setSession);

  async function onSubmit() {
    setError(null);
    const parsed = loginRequestSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError('Enter a valid email and password (8+ characters).');
      return;
    }

    try {
      const res = await apiFetch<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(parsed.data),
      });
      setSession(res.token, res.user);
      router.replace('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Driver</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
      <Link href="/(auth)/signup" style={styles.link}>
        Need an account? Sign up
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  button: { backgroundColor: '#111', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
  error: { color: '#c00' },
  link: { textAlign: 'center', marginTop: 16, color: '#3366cc' },
});
