import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, Icon, Screen } from "../components"
import { colors } from "../theme"

import GirlSvg from "../../assets/icons/girl.svg"
import { useStores } from "../models"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SalesScreen: FC<StackScreenProps<AppStackScreenProps, "Sales">> = observer(
  function SalesScreen() {
    const { salesStore } = useStores()

    function goToSales() {
      salesStore.fetchSales()
    }

    return (
      <Screen contentContainerStyle={$root} preset="scroll" safeAreaEdges={["bottom", "top"]}>
        <View style={$containerButtons}>
          <GirlSvg height={300} width={300} />
          <Button
            style={$buttonNext}
            tx="onboarding.saleCreate"
            RightAccessory={() => <Icon icon="caretRight" />}
            onPress={goToSales}
          />
          <Button
            style={$buttonNext}
            preset="reversed"
            tx="onboarding.productCreate"
            RightAccessory={() => <Icon icon="caretRight" color={colors.palette.accent100} />}
          />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: 10,
}
const $containerButtons: ViewStyle = {
  flex: 1,
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
}
const $buttonNext: ViewStyle = {
  width: "100%",
  marginBottom: 20,
}
