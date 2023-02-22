import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Keyboard, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, Icon, Screen, Text, TextField } from "../components"

import { colors } from "../theme"

import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"

import I18n from "i18n-js"
import Lottie from "lottie-react-native"
import { Formik } from "formik"
import * as Yup from "yup"
import { translate } from "../i18n"

// @ts-ignore
export const GptScreen: FC<StackScreenProps<AppStackScreenProps, "Gpt">> = observer(
  function GptScreen() {
    const navigation = useNavigation()
    const {
      gptStore: { sendMessage, state: stateMessage },
    } = useStores()
    const DisplayingErrorMessagesSchema = Yup.object().shape({
      city: Yup.string()
        .min(2, translate("errors.tooShort"))
        .max(50, translate("errors.tooLong"))
        .required(translate("errors.required")),
      doctor: Yup.string().required(translate("errors.required")),
    })

    async function handleClickDiscover({ city, doctor }: { city: string; doctor: string }) {
      const questionForGpt = `me de recomendação de 5 ${doctor} de ${city}, e junto com isso as informações deles como horário de funcionamento e número de celular,  me de a resposta em um array de javascript no formato: [{"name": "", "horario": "", "celular": ""}] `
      try {
        await sendMessage(questionForGpt)

        navigation.navigate("ListGpt")
      } catch (e) {
        console.log(e)
      }
    }
    return (
      <Screen contentContainerStyle={$root} preset="auto" safeAreaEdges={["bottom", "top"]}>
        <View style={$containerView}>
          <Formik
            validationSchema={DisplayingErrorMessagesSchema}
            initialValues={{ city: "", doctor: "" }}
            onSubmit={handleClickDiscover}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isValid, touched, errors }) => (
              <>
                <View style={$containerAnimation}>
                  <Text tx="gptHome.titlePage" style={$title} />
                  <Lottie
                    source={require("../../assets/animations/location.json")}
                    autoPlay
                    loop
                    style={$animation}
                  />
                </View>
                <View>
                  <TextField
                    onChangeText={handleChange("city")}
                    onBlur={handleBlur("city")}
                    value={values.city}
                    label={"teste"}
                    labelTx={"gptHome.input.city"}
                    helperTx={"gptHome.input.cityHelper"}
                    placeholderTx={"gptHome.input.cityPlaceHolder"}
                    status={touched.city && errors.city ? "error" : null}
                  />
                  {touched.city && errors.city && (
                    <Text style={$textError} preset="default">
                      {errors.city}
                    </Text>
                  )}
                  <TextField
                    containerStyle={$inputDoctor}
                    onChangeText={handleChange("doctor")}
                    onBlur={handleBlur("doctor")}
                    value={values.doctor}
                    labelTx={"gptHome.input.doctor"}
                    helperTx={"gptHome.input.doctorHelp"}
                    placeholderTx={"gptHome.input.doctorPlaceholder"}
                    status={touched.doctor && errors.doctor ? "error" : null}
                  />
                  {touched.doctor && errors.doctor && (
                    <Text style={$textError} preset="default">
                      {errors.doctor}
                    </Text>
                  )}
                </View>
                <Button
                  onPress={() => handleSubmit()}
                  style={$buttonNext}
                  preset="default"
                  disabled={stateMessage === "pending"}
                  tx="gptHome.buttonDiscover"
                  RightAccessory={() =>
                    stateMessage === "pending" ? (
                      <ActivityIndicator color={"000"} />
                    ) : (
                      <Icon icon="caretRight" color={"000"} />
                    )
                  }
                />
              </>
            )}
          </Formik>
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: 30,
}
const $inputDoctor: ViewStyle = {
  marginTop: 30,
}
const $containerView: ViewStyle = {
  flex: 1,
  paddingVertical: 20,
  justifyContent: "space-between",
}

const $title: TextStyle = {
  fontSize: 24,
  marginBottom: 30,
  fontWeight: "bold",
  textAlign: "center",
}

const $buttonNext: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  marginTop: 30,
}

const $containerAnimation: ViewStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
}
const $animation: ViewStyle = {
  height: 200,
}
const $textError: TextStyle = {
  color: colors.error,
}
