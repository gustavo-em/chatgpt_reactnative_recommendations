import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { useHeader } from "../utils/useHeader"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { colors, typography } from "../theme"
// import { useStores } from "../models"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ListGptScreen: FC<StackScreenProps<AppStackScreenProps, "ListGpt">> = observer(
  function ListGptScreen() {
    const navigation = useNavigation()
    useHeader({
      titleTx: "screens.gptListOnboarding",
      leftIcon: "back",
      onLeftPress: () => navigation.goBack(),
    })
    // Pull in one of our MST stores
    const {
      gptStore: { getItem },
    } = useStores()

    function item(props) {
      const {
        item: { name, celular, horario },
      } = props

      return (
        <View style={$containerItem}>
          <View style={$nameItem}>
            <Text style={$nameItemText}>{name}</Text>
          </View>
          <View style={$phoneItem}>
            <Text style={$phoneItemText}>{celular}</Text>
          </View>
          <View style={$hourItem}>
            <Text style={$hourItemText}>{horario}</Text>
          </View>
        </View>
      )
    }

    return (
      <Screen contentContainerStyle={$root} preset="fixed" safeAreaEdges={["bottom", "top"]}>
        <FlatList data={getItem} renderItem={item} />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: 30,
}

const $hourItem: ViewStyle = {
  flex: 1,
}
const $hourItemText: TextStyle = {
  fontSize: 12,
  flexDirection: "row",
  flexWrap: "nowrap",
  fontFamily: typography.primary.light,
}
const $phoneItem: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.primary600,
  width: 120,
}
const $phoneItemText: TextStyle = {
  fontSize: 14,
  flexDirection: "row",
  flexWrap: "nowrap",
  fontFamily: typography.primary.medium,
}
const $nameItem: ViewStyle = {}
const $nameItemText: TextStyle = {
  fontSize: 18,
  flexDirection: "row",
  flexWrap: "nowrap",
  fontWeight: "900",
  fontFamily: typography.primary.bold,
}

const $containerItem: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 20,
  marginVertical: 10,
  width: "100%",
  minHeight: 100,
  borderWidth: 1,
  borderColor: colors.background,
  borderBottomWidth: 0,
  shadowColor: colors.palette.neutral400,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 1,
  paddingHorizontal: 20,
  paddingVertical: 10,
}
