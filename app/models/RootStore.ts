import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GptModel } from "./Gpt"
import { SalesModel } from "./Sales"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  salesStore: types.optional(SalesModel, { sales: [], state: "done", salesStatus: "teste" }),
  gptStore: types.optional(GptModel, { state: "nothing", item: undefined, items: undefined }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
