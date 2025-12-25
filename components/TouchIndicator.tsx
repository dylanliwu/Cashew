import React from "react";
import { View } from "react-native";

type TouchIndicatorProps = {
  x: number;
  y: number;
};

export default function TouchIndicator({ x, y }: TouchIndicatorProps) {
  return (
    <View
      className="absolute"
      style={{
        left: x - 50,
        top: y - 50,
      }}
    >
      <View className="w-[100px] h-[100px] rounded-full bg-white scale border-[6px]" />
    </View>
  );
}
