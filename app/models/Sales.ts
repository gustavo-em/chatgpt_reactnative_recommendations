import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import api from "../services/api/api"
import { withSetPropAction } from "./helpers/withSetPropAction"

const Sale = types.model({
  id: types.identifier,
  name: types.string,
  price: types.number,
})

/**
 * Model description here for TypeScript hints.
 */
export const SalesModel = types
  .model("Sales")
  .props({
    sales: types.array(types.maybeNull(Sale)),
    state: types.enumeration(["pending", "done", "error"]),
    salesStatus: types.string,
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getSales() {
      return self.sales
    },
  }))
  .actions((self) => ({
    fetchSales: flow(function* fetchSales() {
      self.state = "pending"
      try {
        const result = yield api.apisauce.get<typeof Sale>("/")
        self.salesStatus = result.data
        self.state = "done"
      } catch (error) {
        console.error("Failed to fetch projects", error)
        self.state = "error"
      }
    }),
  }))

export interface Sales extends Instance<typeof SalesModel> {}
export interface SalesSnapshotOut extends SnapshotOut<typeof SalesModel> {}
export interface SalesSnapshotIn extends SnapshotIn<typeof SalesModel> {}
export const createSalesDefaultModel = () => types.optional(SalesModel, {})
