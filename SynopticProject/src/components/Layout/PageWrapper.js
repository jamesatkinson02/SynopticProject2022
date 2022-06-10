import { shared } from "../../styles/sharedSheet";
import { ScrollView, Text, View, StatusBar, Platform } from "react-native";
import RMText from "./RMText";

const PageWrapper = (props) => {
  return (
    <ScrollView style={{ marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <View style={shared.pageWrapper}>
        <RMText style={shared.pageTitle}>{props.title}</RMText>
        {props.children}
      </View>
    </ScrollView>
  );
}

export default PageWrapper;
