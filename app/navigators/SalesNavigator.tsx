import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SalesScreen } from "../screens"

export type SalesNavigatorParamList = {
  Sales: undefined
}

const Stack = createStackNavigator<SalesNavigatorParamList>()
export const SalesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Sales"
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="Sales" component={SalesScreen} />
    </Stack.Navigator>
  )
}
