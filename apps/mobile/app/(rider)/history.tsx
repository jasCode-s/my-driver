import { StyleSheet, Text, View } from 'react-native';

// TODO(M4): list past trips once GET /trips is implemented.
export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip history</Text>
      <Text style={styles.subtitle}>No trips yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#666' },
});
