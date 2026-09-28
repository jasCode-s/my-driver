import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

// TODO(M3): pickup/dropoff map picker + "Request Driver" button wired to POST /trips.
export default function RequestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a driver</Text>
      <Text style={styles.subtitle}>Trip requests aren&apos;t wired up yet.</Text>
      <Link href="/(rider)/history" style={styles.link}>
        View trip history
      </Link>
      <Link href="/profile" style={styles.link}>
        Profile
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#666' },
  link: { color: '#3366cc', marginTop: 8 },
});
