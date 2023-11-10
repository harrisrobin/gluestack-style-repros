import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const BarcodeScanModel = types.model("BarcodeScan").props({
  id: types.identifier,
  type: types.enumeration(["ean-13"]),
  value: types.maybeNull(types.string),
})

export interface BarcodeScan extends Instance<typeof BarcodeScanModel> {}
export interface BarcodeScanSnapshot
  extends SnapshotOut<typeof BarcodeScanModel> {}
