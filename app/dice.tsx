import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModeSelector from "../components/ModeSelector";

// Phosphor dice icons
import {
    DiceFiveIcon,
    DiceFourIcon,
    DiceOneIcon,
    DiceSixIcon,
    DiceThreeIcon,
    DiceTwoIcon,
} from "phosphor-react-native";

const diceIcons = [DiceOneIcon, DiceTwoIcon, DiceThreeIcon, DiceFourIcon, DiceFiveIcon, DiceSixIcon];

export default function Dice() {
  const [currentDice, setCurrentDice] = useState(5);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [isRolling, setIsRolling] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, { dy }) => Math.abs(dy) > 10,
      onPanResponderMove: () => {},
      onPanResponderRelease: (evt, { dy }) => {
        if (dy < -50 && !isRolling) {
          rollDice();
        }
      },
    })
  ).current;

  const rollDice = () => {
    setIsRolling(true);
    spinAnim.setValue(0);
    translateY.setValue(0);
    const randomDice = Math.floor(Math.random() * 6);

    // Haptic feedback loop
    const hapticInterval = setInterval(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 150);

    setTimeout(() => {
      setCurrentDice(randomDice);
    }, 600);

    Animated.parallel([
      Animated.timing(spinAnim, {
        toValue: 2,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 30,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      clearInterval(hapticInterval);
      setIsRolling(false);
    });
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 2],
    outputRange: ["0deg", "720deg"],
  });

  const DiceIcon = diceIcons[currentDice];

  return (
    <View className="flex-1 bg-purple-800" {...panResponder.panHandlers}>
      <SafeAreaView>
        <ModeSelector />
      </SafeAreaView>

      {/* Animated Dice */}
      <Animated.View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [
            { translateX: -80 },
            { translateY: Animated.add(translateY, new Animated.Value(-80)) },
            { rotate: spin },
          ],
        }}
      >
        <View>
          {/* Fill */}
          <DiceIcon size={160} color="white" weight="fill" />

          {/* Border */}
          <DiceIcon
            size={160}
            color="black"
            weight="regular"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </View>
      </Animated.View>
    </View>
  );
}
