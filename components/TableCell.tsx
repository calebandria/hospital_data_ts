// TableCell.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type TableCellProps = {
  isHeader?: boolean; 
  children: React.ReactNode;
};

const TableCell: React.FC<TableCellProps>  = ({ children, isHeader }) => {
  return (
    <View style={styles.cell}>
      {isHeader ? (
        <Text style={styles.headerText}>{children}</Text>
      ) : (
        <Text style={styles.cellText}>{children}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    // flex: 1 ensures each column takes up an equal amount of space.
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  cellText: {
    fontSize: 16,
  },
  headerText: {
    fontSize: 16,
    color:'#55ACEE'
  },
});

export default TableCell;