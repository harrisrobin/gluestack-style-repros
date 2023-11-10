import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { LocationGeocodedAddressModel } from "./location-geocoded-address";
import { reportError } from "../../utils/exceptions";

export const LocationStoreModel = types
  .model("LocationStore")
  .props({
    latitude: types.maybeNull(types.number),
    longitude: types.maybeNull(types.number),
    lastCheckedAt: types.maybeNull(types.number),
    locationGeocodedAddress: types.maybeNull(LocationGeocodedAddressModel),
  })
  .actions((store) => ({
    setLatitude(value: number) {
      store.latitude = value;
    },
    setLongitude(value: number) {
      store.longitude = value;
    },
    setLastCheckedAt(value: number) {
      store.lastCheckedAt = value;
    },
    setLocationGeocodedAddress(value: Location.LocationGeocodedAddress) {
      store.locationGeocodedAddress = value;
    },
  }))
  .views((store) => ({
    get isLocationAvailable() {
      return store.latitude !== null && store.longitude !== null;
    },
    get isLocationGeocoded() {
      return store.locationGeocodedAddress !== null;
    },
    get formattedStateAndCountry() {
      if (!this.isLocationGeocoded) return null;
      return [
        store.locationGeocodedAddress?.subregion,
        store.locationGeocodedAddress?.country,
      ]
        .filter(Boolean)
        .join(", ");
    },
  }))
  .actions((store) => ({
    async getCurrentLocationAsync() {},

    async getLocationAddressAsync() {},
  }))
  .actions((store) => ({
    reset() {
      store.latitude = null;
      store.longitude = null;
      store.lastCheckedAt = null;
      store.locationGeocodedAddress = null;
    },
  }))
  .actions((store) => ({
    onAppForeground() {
      store.getCurrentLocationAsync().catch(reportError);
      store.getLocationAddressAsync().catch(reportError);
    },
  }));

export interface LocationStore extends Instance<typeof LocationStoreModel> {}
export interface LocationStoreSnapshot
  extends SnapshotOut<typeof LocationStoreModel> {}
