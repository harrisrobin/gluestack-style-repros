import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const ProductModel = types.model("Product").props({
  uuid: types.identifier,
  title: types.maybeNull(types.string),
  issuing_country: types.maybeNull(types.string),
  thumbnail_url: types.maybeNull(types.string),
})

export interface Product extends Instance<typeof ProductModel> {}
export interface ProductSnapshot extends SnapshotOut<typeof ProductModel> {}
