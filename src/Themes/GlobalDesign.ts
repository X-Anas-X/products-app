import {StyleSheet} from 'react-native';
const color = require('./Colors');

export const GlobalDesign = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    backgroundColor: '#008000',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  logout: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});
