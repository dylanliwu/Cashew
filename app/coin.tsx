import * as Haptics from "expo-haptics";
import { AlienIcon, CircleIcon, XCircleIcon } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModeSelector from "../components/ModeSelector";

export default function Coin() {
  const [isHeads, setIsHeads] = useState(true);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [isFlipping, setIsFlipping] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, { dy }) => Math.abs(dy) > 10,
      onPanResponderMove: () => {},
      onPanResponderRelease: (evt, { dy }) => {
        if (dy < -50 && !isFlipping) {
          flipCoin();
        }
      },
    })
  ).current;

  const flipCoin = () => {
    setIsFlipping(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    spinAnim.setValue(0);
    translateY.setValue(0);
    const randomResult = Math.random() < 0.5;

    setTimeout(() => {
      setIsHeads(randomResult);
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
    <View className="flex-1 bg-green-700" {...panResponder.panHandlers}>
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
            { translateY: Animated.add(translateY, new Animated.Value(-80)) },
            { rotateX },
          ],
        }}
      >
        <View>
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
            transform: [{ translateX: -137 / 2 }, { translateY: -137 / 2 }],
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
            transform: [{ translateX: -40 }, { translateY: -40 }],
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
        </View>
      </Animated.View>
    </View>
  );
}