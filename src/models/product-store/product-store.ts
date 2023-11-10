import { Instance, SnapshotOut, types } from "mobx-state-tree";
import uniqBy from "lodash/uniqBy";
import { Product, ProductModel } from "./product";
import { PaginationModel } from "../pagination/pagination";

export const ProductStoreModel = types
  .model("ProductStore")
  .props({
    products: types.optional(types.array(ProductModel), []),
    selectedProduct: types.maybeNull(types.safeReference(ProductModel)),
    productsPagination: types.optional(PaginationModel, {}),
  })
  .actions((store) => ({
    setSelectedProduct(value: Product) {
      store.selectedProduct = value;
    },
    appendProducts(value: Product[]) {
      store.products.replace(uniqBy([...store.products, ...value], "uuid"));
    },
  }))
  .actions((store) => ({
    async apiFetchProducts() {},
    async apiSearchProductByUuid(uuid: string): Promise<Product | void> {},
  }));

export interface ProductStore extends Instance<typeof ProductStoreModel> {}
export interface ProductStoreSnapshot
  extends SnapshotOut<typeof ProductStoreModel> {}
