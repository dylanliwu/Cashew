import { CircleDollarSign, Dice6, Hand, Settings } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

export default function ModeSelector() {
  return (
    <View className="flex-row justify-center items-center w-full gap-6 mt-4">
        <Pressable onPress={() => {}}><Hand fill="white" /></Pressable>
        <Pressable onPress={() => {}}><Dice6 fill="white"/></Pressable>
        <Pressable onPress={() => {}}><CircleDollarSign fill="white" /></Pressable>      
        <Pressable onPress={() => {}}><Settings fill="white" /></Pressable>    
    </View>
  );
}
