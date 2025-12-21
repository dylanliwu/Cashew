import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import { GestureResponderEvent, View } from "react-native";
import TouchIndicator from "../components/TouchIndicator";

export default function Index() {
  const [touches, setTouches] =
    useState<GestureResponderEvent["nativeEvent"]["touches"]>([]);
  const [chosenId, setChosenId] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTouchCount = useRef(0);

  const onTouchesStable = () => {
    setTouches((prev) => {
      if (prev.length <= 1) return prev;

      const i = Math.floor(Math.random() * prev.length);
      setChosenId(Number(prev[i].identifier));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      return [prev[i]];
    });
  };

  useEffect(() => {
    if (touches.length > prevTouchCount.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    prevTouchCount.current = touches.length;
  }, [touches.length]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (touches.length > 1 && chosenId === null) {
      timerRef.current = setTimeout(onTouchesStable, 2500);
    }
  }, [touches.length, chosenId]);

  const handleTouches = (evt: GestureResponderEvent) => {
    const incoming = evt.nativeEvent.touches;

    if (chosenId !== null) {
      const chosenTouch = incoming.find(
        (t) => Number(t.identifier) === chosenId
      );

      if (chosenTouch) {
        setTouches([chosenTouch]);
      } else {
        setTouches([]);
        setChosenId(null);
        prevTouchCount.current = 0;
      }
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
        <TouchIndicator key={t.identifier} x={t.pageX} y={t.pageY} />
      ))}
    </View>
  );
}
