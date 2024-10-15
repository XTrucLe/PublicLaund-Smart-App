import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string | number;
}

const InformationRow: React.FC<Props> = ({ label, value }) => {
  return (
    <View style={styles.row}>
      <Text>{label}:</Text>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default InformationRow;