import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

// TODO(M2): wire the online toggle to connectSocket() + emit driver:online / driver:location pings.
export default function DriverHomeScreen() {
  const [online, setOnline] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver</Text>
      <View style={styles.row}>
        <Text>{online ? 'Online' : 'Offline'}</Text>
        <Switch value={online} onValueChange={setOnline} />
      </View>
      <Text style={styles.subtitle}>Trip offers aren&apos;t wired up yet.</Text>
      <Link href="/profile" style={styles.link}>
        Profile
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  subtitle: { color: '#666' },
  link: { color: '#3366cc', marginTop: 8 },
});
