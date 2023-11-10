import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { AuthUser, AuthUserModel } from "./authentication-user";
import { getRootStore } from "../helpers/get-root-store";

interface ApiSignInWithIdTokenParams {
  identityToken: string;
  provider: "apple" | "google";
}

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .volatile(() => ({
    onAuthStateChangedUnsubscribe: null as null | (() => void),
  }))
  .props({
    authUser: types.maybeNull(AuthUserModel),
  })
  .actions((store) => ({
    setAuthUser(user: AuthUser) {
      store.authUser = user;
    },
    reset() {
      store.authUser = null;
    },
  }))

  .actions((store) => ({
    async apiGetAuthUser() {},
    async apiSignOut() {},
    async onSignInSuccess() {
      const rootStore = getRootStore(store);
      await rootStore.userStore.apiGetCurrentUserProfile();
    },
  }))
  .actions((store) => ({
    async apiSignInWithIdToken({
      identityToken,
      provider,
    }: ApiSignInWithIdTokenParams) {},
  }))
  .views((store) => ({
    get isSignedIn(): boolean {
      return !!store.authUser?.id;
    },
    get isAdmin(): boolean {
      return store.authUser?.isAdmin ?? false;
    },
    get isEditor(): boolean {
      return store.authUser?.isEditor ?? false;
    },
  }))
  .actions((store) => ({
    afterCreate() {},
    beforeDestroy() {},
  }));

export interface AuthenticationStore
  extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot
  extends SnapshotOut<typeof AuthenticationStoreModel> {}
