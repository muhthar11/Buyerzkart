import {
  DeleteProduct,
  addProduct,
  updateProduct,
} from "controller/services/productServices";
import React, { useContext } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "controller/context/alertContext";
import { formatImage } from "controller/common/formatImage";
import { useProduct, useOneProduct } from "model/queryCalls/queryCalls";

export const useProducts = () => {
  const { id } = useParams();
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [productImage, setProductImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = React.useRef(null); // Use ref for file input
  const [isActive, setIsActive] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isVisible, setIsVisible] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  const { data: productData, isSuccess } = useOneProduct({ id });

  const { refetch } = useProduct({ page, rowsPerPage });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  const initialValues = {
    name: "",
    image: "",
    description: "",
    price: "",
    isActive: true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
    // image: Yup.mixed().required("Please upload an Image"),
    description: Yup.string().required("Please enter description"),
    price: Yup.number().required("Please enter a number")
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      const params = {
        values,
        isActive,
        image: productImage
          ? formatImage({ file: productImage, source: "imageKit" })
          : null,
      };
      if (id) {
        await updateProduct({ id, ...params });
        setLoading(false);
        setAlert({
          active: true,
          type: "success",
          message: "Product Updated successfully",
        });
      } else {
        await addProduct(params);
        setLoading(false);
        setAlert({
          active: true,
          type: "success",
          message: "Product added successfully",
        });
      }
      setTimeout(() => {
        navigate("/admin/default");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setAlert({
        active: true,
        type: "error",
        message: " Error while adding Product",
      });
    }
  };

  const onError = () => {
    setAlert({
      active: true,
      type: "error",
      message: " Error while uploading image",
    });
    setIsUploading(false);
  };
  const onSuccess = (res: any) => {
    setProductImage(res);
    setIsUploading(false);
  };
  const onUploadProgress = () => {
    setIsUploading(true);
  };

  const handleDeleteFile = () => {
    setProductImage(null);
  };

  const onDelete = async (deleteId: any) => {
    try {
      await DeleteProduct({ id: deleteId });
      refetch();
      setAlert({
        active: true,
        type: "success",
        message: "Successfully Deleted",
      });
    } catch (error) {
      setAlert({
        active: true,
        type: "success",
        message: "Failed to delete",
      });
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    onError,
    onSuccess,
    onUploadProgress,
    isUploading,
    productImage,
    loading,
    setLoading,
    fileInputRef,
    isActive,
    setIsActive,
    handleDeleteFile,
    setAlert,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    id,
    isSuccess,
    productData,
    setProductImage,
    onDelete,
    deleteId,
    setDeleteId,
    isVisible,
    setIsVisible,
  };
};
