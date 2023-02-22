import { GptModel } from "./Gpt"

test("can be created", () => {
  const instance = GptModel.create({})

  expect(instance).toBeTruthy()
})
