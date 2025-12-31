import * as Haptics from "expo-haptics";
import {
  AlienIcon,
  CircleIcon,
  XCircleIcon,
} from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModeSelector from "../components/ModeSelector";

export default function Coin() {
  const [isHeads, setIsHeads] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  const spinAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 10,
      onPanResponderMove: () => {},
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -50 && !isFlipping) flipCoin();
      },
    })
  ).current;

  const flipCoin = () => {
    setIsFlipping(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    spinAnim.setValue(0);
    translateY.setValue(0);

    const result = Math.random() < 0.5;

    setTimeout(() => {
      setIsHeads(result);
    }, 1000);

    Animated.parallel([
      Animated.timing(spinAnim, {
        toValue: 3,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1100,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setIsFlipping(false);
    });
  };

  const rotateX = spinAnim.interpolate({
    inputRange: [0, 3],
    outputRange: ["0deg", "1080deg"],
  });

  return (
    <View className="flex-1 bg-green-800" {...panResponder.panHandlers}>
      <SafeAreaView>
        <ModeSelector />
      </SafeAreaView>

      <Animated.View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [
            { translateX: -80 },
            {
              translateY: Animated.add(
                translateY,
                new Animated.Value(-80)
              ),
            },
            { rotateX },
          ],
        }}
      >
        {isHeads ? (
          <>
            <CircleIcon size={160} color="black" weight="fill" />
            <CircleIcon
              size={137}
              color="white"
              weight="fill"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [
                  { translateX: -68.5 },
                  { translateY: -68.5 },
                ],
              }}
            />
            <AlienIcon
              size={80}
              color="black"
              weight="bold"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [
                  { translateX: -40 },
                  { translateY: -40 },
                ],
              }}
            />
          </>
        ) : (
          <>
            <XCircleIcon size={160} color="white" weight="fill" />
            <XCircleIcon
              size={160}
              color="black"
              weight="regular"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </>
        )}
      </Animated.View>
    </View>
  );
}
