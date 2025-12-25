import { usePathname, useRouter } from "expo-router";
import { CurrencyCircleDollarIcon, DiceFiveIcon, HandPointingIcon } from "phosphor-react-native";
import React from "react";
import { Pressable, View } from "react-native";

export default function ModeSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  return (
    <View className="flex-row justify-center items-center w-full gap-6 mt-4">
      <Pressable onPress={() => { router.replace("/") }}>
        <HandPointingIcon
          size={28}
          color={isActive("/") ? "orange" : "white"}
          weight="fill"
        />

        <HandPointingIcon
          size={28}
          color="black"
          weight="bold"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Pressable>
      <Pressable onPress={() => { router.replace("/dice") }}>
        <DiceFiveIcon
          size={28}
          color={isActive("/dice") ? "orange" : "white"}
          weight="fill"
        />

        <DiceFiveIcon
          size={28}
          color="black"
          weight="bold"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Pressable>
      <Pressable onPress={() => { router.replace("/coin") }}>
          <CurrencyCircleDollarIcon
            size={28}
            color={isActive("/coin") ? "orange" : "white"}
            weight="fill"
          />
          <CurrencyCircleDollarIcon
            size={28}
            color="black"
            weight="bold"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
      </Pressable>
      {/* <Pressable onPress={() => { router.replace("/settings") }}>
        <Settings fill={isActive("/settings") ? "orange" : "white"} />
      </Pressable> */}
    </View>
  );
}
