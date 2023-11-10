import { AppState, NativeEventSubscription } from "react-native";
import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { AuthenticationStoreModel } from "./authentication-store";
import { DeviceStoreModel } from "./device-store";
import { UserStoreModel } from "./user-store/user-store";
import { BarcodeStoreModel } from "./barcode-store";
import { ProductStoreModel } from "./product-store";
import { LocationStoreModel } from "./location-store";
import { BoycottStoreModel } from "./boycott-store";

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model("RootStore")
  .volatile(() => ({
    appStateListener: null as NativeEventSubscription | null,
  }))
  .props({
    authenticationStore: types.optional(AuthenticationStoreModel, {}),
    deviceStore: types.optional(DeviceStoreModel, {}),
    userStore: types.optional(UserStoreModel, {}),
    barcodeStore: types.optional(BarcodeStoreModel, {}),
    productStore: types.optional(ProductStoreModel, {}),
    locationStore: types.optional(LocationStoreModel, {}),
    boycottStore: types.optional(BoycottStoreModel, {}),
  })
  .actions((self) => ({
    onAppForeground(state = "active") {
      if (state === "active") {
        if (__DEV__) {
          console.log("App Is foregrounded");
        }
        self.locationStore.onAppForeground();
      }
    },
    reset() {
      self.authenticationStore.reset();
      self.userStore.reset();
      self.barcodeStore.reset();
    },
  }))
  .actions((self) => ({
    afterCreate() {
      self.appStateListener = AppState.addEventListener(
        "change",
        self.onAppForeground
      );
    },
    beforeDestroy() {
      self.appStateListener?.remove();
    },
  }));

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
