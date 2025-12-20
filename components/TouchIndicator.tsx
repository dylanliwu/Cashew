import React from "react";
import { View } from "react-native";

type TouchIndicatorProps = {
  x: number;
  y: number;
};

export default function TouchIndicator({ x, y }: TouchIndicatorProps) {
  return (
    <View
      className="absolute w-[100px] h-[100px] rounded-full bg-white"
      style={{
        left: x - 50,
        top: y - 50,
      }}
    />
  );
}