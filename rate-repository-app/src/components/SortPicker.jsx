import { StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';

import theme from "../theme";

const styles = StyleSheet.create({
  sortPicker: {
    height: 60,
    margin: 20,
    marginTop: 0,
    fontSize: theme.fontSizes.subheading,
    backgroundColor: theme.colors.mainBackground,
    borderWidth: 0
  },
});

const SortPicker = ({ selectedSort, setSelectedSort }) => {
  return (
    <Picker
      selectedValue={selectedSort}
      style={styles.sortPicker}
      onValueChange={(itemValue) => 
        setSelectedSort(itemValue)
      }
      prompt={'Select an item...'}
    >
      <Picker.Item label='Latest repositories' value='latest' />
      <Picker.Item label='Highest rated repositories' value='highRated' />
      <Picker.Item label='Lowest rated repositories' value='lowRated' />
    </Picker>
  )
}

export default SortPicker;