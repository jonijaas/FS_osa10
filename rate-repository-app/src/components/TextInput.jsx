import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  textInput: {
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    margin: 10,
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.textInput, style, { borderColor: error ? theme.colors.error : theme.colors.textSecondary }];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;