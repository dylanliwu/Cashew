import { makeMutable } from "react-native-reanimated";

export const pulseProgress = makeMutable(0);
export const pulseRunning = makeMutable(false);

export const PULSE_DURATION = 2500;
