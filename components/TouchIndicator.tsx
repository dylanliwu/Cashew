import { pulseProgress } from "@/lib/animationClock";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function TouchIndicator({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      pulseProgress.value,
      [0, 0.5, 1],
      [1, 1.2, 1]
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          left: x - 62.5,
          top: y - 62.5,
          width: 125,
          height: 125,
          borderRadius: 62.5,
          backgroundColor: "white",
          borderWidth: 6,
        },
      ]}
    />
  );
}
