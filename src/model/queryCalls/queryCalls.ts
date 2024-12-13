import { useQuery } from "react-query";
import { getProducts, getOneProduct } from "controller/services/productServices";

export const useProduct = ({ page, rowsPerPage }: any) => {
  return useQuery(["productsData", page, rowsPerPage], () =>
   getProducts({ page, rowsPerPage })
  );
};

export const useOneProduct = ({ id }: any) => {
  return useQuery(["oneProduct", { id }], () => getOneProduct({ id }));
};
