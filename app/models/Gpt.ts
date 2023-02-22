import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import api from "../services/api/api"
import { withSetPropAction } from "./helpers/withSetPropAction"

const Doctor = types.model({
  name: types.string,
  horario: types.string,
  celular: types.string,
})

/**
 * Model description here for TypeScript hints.
 */
export const GptModel = types
  .model("Gpt")
  .props({
    items: types.array(Doctor),
    item: types.array(Doctor),
    state: types.enumeration(["pending", "done", "error", "nothing"]),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getItem() {
      return self.item
    },
  }))
  .actions((self) => ({
    sendMessage: flow(function* sendMessage(text: string) {
      self.state = "pending"
      try {
        const result = yield api.apisauce.post("/gpt", { text })

        console.log("iai", result.data.data)
        const match = result.data.data.match(/\[[^]*\]/)

        if (match) {
          const arrayString = match[0]
          const array = JSON.parse(arrayString)
          console.log(array)
          self.item = array
          self.state = "done"
        } else {
          console.log("Array não encontrado na string.")
          self.state = "error"
        }
      } catch (error) {
        self.state = "error"
        console.error("Failed to fetch response", error)
      }
    }),
  }))

export interface Gpt extends Instance<typeof GptModel> {}
export interface GptSnapshotOut extends SnapshotOut<typeof GptModel> {}
export interface GptSnapshotIn extends SnapshotIn<typeof GptModel> {}
export const createGptDefaultModel = () => types.optional(GptModel, {})
