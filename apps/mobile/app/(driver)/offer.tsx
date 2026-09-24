import { StyleSheet, Text, View } from 'react-native';

// TODO(M3): render an incoming trip:offer payload with accept/decline actions + countdown.
export default function OfferScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip offer</Text>
      <Text style={styles.subtitle}>No offer flow yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#666' },
});
