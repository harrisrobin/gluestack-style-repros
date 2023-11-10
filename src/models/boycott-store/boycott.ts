import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserProfileModel } from "@/models/user-store/user-profile"
import { LocationGeocodedAddressModel } from "@/models/location-store/location-geocoded-address"

export const BoycottModel = types.model("Boycott").props({
  id: types.identifierNumber,
  created_at: types.maybe(types.string),
  user_id: types.safeReference(types.late(() => UserProfileModel)),
  product_uuid: types.string,
  location: types.maybeNull(LocationGeocodedAddressModel),
  location_coords: types.maybeNull(types.string),
})

export interface Boycott extends Instance<typeof BoycottModel> {}
export interface BoycottSnapshot extends SnapshotOut<typeof BoycottModel> {}
