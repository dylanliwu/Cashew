import ModeSelector from "@/components/ModeSelector";
import TouchIndicator from "@/components/TouchIndicator";
import {
  PULSE_DURATION,
  pulseProgress,
  pulseRunning,
} from "@/lib/animationClock";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import { GestureResponderEvent, View } from "react-native";
import { withRepeat, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [touches, setTouches] = useState<any[]>([]);
  const [chosenId, setChosenId] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTouchCount = useRef(0);

  useEffect(() => {
    if (touches.length > 0 && !pulseRunning.value) {
      pulseRunning.value = true;
      pulseProgress.value = withRepeat(
        withTiming(1, { duration: PULSE_DURATION }),
        -1,
        false
      );
    }

    if (touches.length === 0) {
      pulseRunning.value = false;
      pulseProgress.value = 0;
      setChosenId(null);
      prevTouchCount.current = 0;
    }
  }, [touches.length]);

  useEffect(() => {
    if (touches.length > prevTouchCount.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    prevTouchCount.current = touches.length;
  }, [touches.length]);

  const onTouchesStable = () => {
    setTouches((prev) => {
      if (prev.length <= 1) return prev;

      const chosen = prev[Math.floor(Math.random() * prev.length)];
      setChosenId(chosen.identifier);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      return [chosen];
    });
  };

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (touches.length > 1 && chosenId === null) {
      timerRef.current = setTimeout(onTouchesStable, 2500);
    }
  }, [touches.length, chosenId]);

  const handleTouches = (evt: GestureResponderEvent) => {
    const incoming = evt.nativeEvent.touches as any[];

    if (chosenId !== null) {
      const chosenTouch = incoming.find(
        (t) => t.identifier === chosenId
      );

      setTouches(chosenTouch ? [chosenTouch] : []);
      return;
    }

    setTouches(incoming);
  };

  return (
    <View
      className="flex-1 bg-yellow-500"
      onTouchStart={handleTouches}
      onTouchMove={handleTouches}
      onTouchEnd={handleTouches}
      onTouchCancel={handleTouches}
    >
      {touches.map((t) => (
        <TouchIndicator
          key={t.identifier}
          x={t.pageX}
          y={t.pageY}
        />
      ))}

      <SafeAreaView>
        <View
          onStartShouldSetResponder={() => true}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <ModeSelector />
        </View>
      </SafeAreaView>
    </View>
  );
}
