import React, { useEffect, useRef, useState } from "react";
import { GestureResponderEvent, View } from "react-native";
import TouchIndicator from "../components/TouchIndicator";

export default function Index() {
  const [touches, setTouches] =
    useState<GestureResponderEvent["nativeEvent"]["touches"]>([]);

  const [chosenId, setChosenId] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onTouchesStable = () => {
    setTouches((prev) => {
      if (prev.length <= 1) return prev;

      const i = Math.floor(Math.random() * prev.length);
      setChosenId(Number(prev[i].identifier));
      return [prev[i]];
    });
  };

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (touches.length > 1 && chosenId === null) {
      timerRef.current = setTimeout(onTouchesStable, 1000);
    }
  }, [touches.length, chosenId]);

  const handleTouches = (evt: GestureResponderEvent) => {
    const incoming = evt.nativeEvent.touches;

    if (chosenId !== null) {
      const chosenTouch = incoming.find(
        (t) => Number(t.identifier) === chosenId
      );
      setTouches(chosenTouch ? [chosenTouch] : []);
      return;
    }

    setTouches(incoming);
  };

  return (
    <View
      className="flex-1 bg-yellow-500"
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onStartShouldSetResponderCapture={() => true}
      onMoveShouldSetResponderCapture={() => true}
      onResponderGrant={handleTouches}
      onResponderMove={handleTouches}
      onResponderRelease={() => {
        setTouches([]);
        setChosenId(null);
      }}
      onResponderTerminate={() => {
        setTouches([]);
        setChosenId(null);
      }}
    >
      {touches.map((t) => (
        <TouchIndicator
          key={t.identifier}
          x={t.pageX}
          y={t.pageY}
        />
      ))}
    </View>
  );
}
