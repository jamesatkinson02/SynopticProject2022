import { shared } from "../../styles/sharedSheet";
import { ScrollView, Text, View, StatusBar, Platform } from "react-native";

const PageWrapper = (props) => {
  return (
    <ScrollView style={{ marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <View style={shared.pageWrapper}>
        <Text style={shared.pageTitle}>{props.title}</Text>
        {props.children}
      </View>
    </ScrollView>
  );
}

export default PageWrapper;
