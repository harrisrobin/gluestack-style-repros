import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { BarcodeScan, BarcodeScanModel } from "./barcode-scan";
import { reportError } from "../../utils/exceptions";
import { ApiBarcodeSearchByEanResponse } from "./barcode-store.types";

export const BarcodeStoreModel = types
  .model("BarcodeStore")
  .props({
    lastScan: types.maybeNull(BarcodeScanModel),
  })
  .actions((store) => ({
    setLastScan(value: BarcodeScan) {
      store.lastScan = value;
    },
    reset() {
      store.lastScan = null;
    },
  }))
  .actions((store) => ({
    async apiBarcodeSearchByEan(
      ean: string,
      type: string
    ): Promise<ApiBarcodeSearchByEanResponse["barcode"] | void> {},
  }));

export interface BarcodeStore extends Instance<typeof BarcodeStoreModel> {}
export interface BarcodeStoreSnapshot
  extends SnapshotOut<typeof BarcodeStoreModel> {}
