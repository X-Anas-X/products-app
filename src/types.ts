export type Product = {
  _id?: string;
  name: string;
  price: number;
  productType: productTypeEnum;
};

export type EditProductType = {
  _id?: string;
  name?: string;
  price?: number;
  productType?: productTypeEnum;
};

export enum productTypeEnum {
  integrated = 'integrated',
  peripheral = 'peripheral',
}
