import { SalesModel } from "./Sales"

test("can be created", () => {
  const instance = SalesModel.create({})

  expect(instance).toBeTruthy()
})
