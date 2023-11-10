import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Device, DeviceModel } from "./device";

export const DeviceStoreModel = types
  .model("DeviceStore")
  .props({
    currentDevice: types.optional(DeviceModel, {} as Device),
  })
  .actions((self) => ({
    refreshCurrentDeviceInfo() {},
  }))
  .actions((self) => ({
    reset() {
      self.currentDevice = {} as Device;
    },
  }));

export interface DeviceStore extends Instance<typeof DeviceStoreModel> {}
export interface DeviceStoreSnapshot
  extends SnapshotOut<typeof DeviceStoreModel> {}
