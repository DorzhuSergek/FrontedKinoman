import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PopularComponent from "../components/PopularComponent";
import { gStyle } from "../style/gStyle";
import InTrendComponents from "../components/InTrendComponents";
import InMoviesComponents from "../components/InMoviesComponents";
import BestMoviesComponents from "../components/BestMoviesComponents";
export default function HomeScreen() {
  console.log(localStorage.getItem("token"));
  return (
    <View style={gStyle.container}>
      <ScrollView>
        <PopularComponent />
        <InTrendComponents />
        <InMoviesComponents />
        <BestMoviesComponents />
      </ScrollView>
    </View>
  );
}
