import { Instance, SnapshotOut, types } from "mobx-state-tree";
import uniqBy from "lodash/uniqBy";
import { BoycottModel, Boycott } from "./boycott";
import { PaginationModel } from "../pagination/pagination";

const BOYCOTT_SELECT =
  "id, created_at, user_id, product_uuid, location, location_coords, user_profiles(id, email, username, avatar_url)";

export const BoycottStoreModel = types
  .model("BoycottStore")
  .volatile(() => ({}))
  .props({
    boycotts: types.optional(types.array(BoycottModel), []),
    boycottsPagination: types.optional(PaginationModel, {}),
  })
  .actions((store) => ({
    appendBoycotts(value: Boycott[]) {
      store.boycotts.replace(uniqBy([...store.boycotts, ...value], "id"));
    },
  }))
  .actions((store) => ({
    async apiFetchBoycotts() {},
    async apiCreateUserBoycott(productUuid: string) {},
  }))
  .actions((store) => ({
    afterCreate() {},
    beforeDestroy() {},
  }));

export interface BoycottStore extends Instance<typeof BoycottStoreModel> {}
export interface BoycottStoreSnapshot
  extends SnapshotOut<typeof BoycottStoreModel> {}
