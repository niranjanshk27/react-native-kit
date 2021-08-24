import React, { ReactElement } from "react";
import { View, TouchableOpacity, ViewProps } from "react-native";

type RenderItemArgsType<T> = {
  item: T;
  isSelected: boolean;
  index: number;
}

type TabProps<T> = {
  style?: ViewProps["style"];
  items: Array<T>;
  selected: T;
  keyExtractor?: (item: T) => string;
  onChange: React.Dispatch<React.SetStateAction<T>> | ((item: T) => void);
  renderItem: (args: RenderItemArgsType<T>) => ReactElement;
};

export function Tabs<T>({
  style,
  items,
  selected,
  onChange,
  renderItem,
  keyExtractor,
}: TabProps<T>) {
  return (
    <View style={[style, { flexDirection: "row" }]}>
      {items.map((item, index) => {
        const isSelected = selected === item;
        const key = keyExtractor ? keyExtractor(item) : `${index}`;

        return (
          <TouchableOpacity key={key} onPress={() => onChange(item)}>
            {renderItem({ item, isSelected, index })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
