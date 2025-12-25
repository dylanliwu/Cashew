import { View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModeSelector from "../components/ModeSelector";

export default function Settings() {
    return (
        <View className="bg-gray-800 flex-1">
            <SafeAreaView>
                <ModeSelector />
            </SafeAreaView>
        </View>
    )
}