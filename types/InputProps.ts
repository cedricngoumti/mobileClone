import { StyleProp, TextInputProps } from "react-native";

export type InputProps = TextInputProps & {
  labelValue: string;
  placeholderText: string;
  iconType: any;
  style?: StyleProp<TextInputProps>;
  onChangeText: (e: string) => void;
};
