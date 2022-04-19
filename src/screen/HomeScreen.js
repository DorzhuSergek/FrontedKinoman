import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PopularComponent from "../components/PopularComponent";
import { gStyle } from "../style/gStyle";

export default function HomeScreen() {
  return (
    <View style={gStyle.container}>
      <SafeAreaView>
        <ScrollView>
          <PopularComponent />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
