import { shared } from "../../styles/sharedSheet";
import { ScrollView, Text, View } from "react-native";

const PageWrapper = (props) => {
  return (
    <ScrollView>
      <View style={shared.pageWrapper}>
        <Text style={shared.pageTitle}>{props.title}</Text>
        {props.children}
      </View>
    </ScrollView>
  );
}

export default PageWrapper;
