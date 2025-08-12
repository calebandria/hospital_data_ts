// TableRow.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

type TableRowProps = {
  children: React.ReactNode;
};

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default TableRow;