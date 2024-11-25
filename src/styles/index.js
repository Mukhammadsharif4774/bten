import {StyleSheet} from 'react-native';
import {COLORS} from '../helpers/colors';

export const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '101%',
    width: '100%',
    backgroundColor: COLORS.white,
  },
  scroll: {
    paddingBottom: 200,
  },
  flex: {
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.main,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    width: '100%',
    height: 55,
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  qrImage: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
