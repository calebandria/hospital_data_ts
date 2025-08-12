import React from 'react';
import { View, StyleSheet } from 'react-native';

type TableProps = {
  children: React.ReactNode;
};

const Table:React.FC<TableProps>  = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: 400,
  },
});

export default Table;