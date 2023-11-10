import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { UserProfile, UserProfileModel } from "./user-profile";

export const UserStoreModel = types
  .model("UserStore")
  .props({
    currentUserProfile: types.maybeNull(UserProfileModel),
  })
  .actions((store) => ({
    setCurrentUserProfile(user: UserProfile) {
      store.currentUserProfile = user;
    },
  }))
  .actions((store) => ({
    async apiCheckIfUsernameExists(username: string) {},
    async apiSaveCurrentUserProfile(fieldsToUpdate: Partial<UserProfile>) {},
    async apiGetCurrentUserProfile() {},
  }))
  .actions((store) => ({
    reset() {
      store.currentUserProfile = null;
    },
  }));

export interface AuthStore extends Instance<typeof UserStoreModel> {}
export interface DeviceStoreSnapshot
  extends SnapshotOut<typeof UserStoreModel> {}
