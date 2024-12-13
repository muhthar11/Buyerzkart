import Card from "components/card";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Switch from "components/switch";
import { MdClose, MdFileUpload } from "react-icons/md";
import { IKContext, IKUpload } from "imagekitio-react";
import {
  authenticator,
  publicKey,
  urlEndpoint,
} from "controller/common/imageKit/imageKit";
import { useProducts } from "./useProduct";
import { CircularProgress } from "@mui/material";
import React from "react";

const AddProduct = () => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    onError,
    onSuccess,
    onUploadProgress,
    isUploading,
    productImage,
    loading,
    fileInputRef,
    isActive,
    setIsActive,
    handleDeleteFile,
    setAlert,
    id,
    isSuccess,
    productData,
    setProductImage,
  } = useProducts();

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="col-span-5 my-10 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
        <Card extra={"w-full h-full p-3"}>
          <div className="relative mb-3 items-center justify-between py-10 lg:px-10">
            {/* <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              Notifications
            </h4> */}
            <div className="px-5">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ setValues }) => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  React.useEffect(() => {
                    if (id && productData) {
                      setValues({
                        name: productData.name.en,
                        image: "",
                        description: productData.description.en,
                        price:productData.price,
                        isActive: productData.isActive,
                      });
                      setIsActive(productData?.isActive);
                      setProductImage(productData?.image);
                    }
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                  }, [id, isSuccess, productData]);
                  return (
                    <Form>
                      <div className="mb-3">
                        <label className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
                          Product Name*
                        </label>
                        <Field
                          type="name"
                          name="name"
                          className={
                            "mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                          }
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>

                      <div className="mb-3 grid grid-cols-1 gap-10 md:grid-cols-2">
                        <div className="flex-column mb-3 mt-4 flex-1 items-center gap-3">
                          <label className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
                            Product Image*
                          </label>
                          {/* <Field
                      type=""
                      name="name"
                      className={
                        "mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                      }
                    /> */}
                          <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
                            <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
                              {productImage && productImage?.url ? (
                                <>
                                  <div className="relative flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                                    <div className="relative h-[120px] flex-shrink-0">
                                      <img
                                        src={productImage?.url}
                                        alt={productImage?.name}
                                        className="h-[120px] w-[120px]"
                                      />
                                    </div>
                                    <button
                                      className="absolute right-1 top-1"
                                      onClick={() => handleDeleteFile()}
                                    >
                                      <MdClose className="h-6 w-6" />
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <button
                                  onClick={() => {
                                    fileInputRef.current.click();
                                  }}
                                  type="button"
                                  className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0"
                                >
                                  {isUploading ? (
                                    <CircularProgress className="h-[80px] w-[80px]" />
                                  ) : (
                                    <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                                  )}
                                  <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                                    Upload Files
                                  </h4>
                                  <p className="mt-2 text-sm font-medium text-gray-600">
                                    {isUploading
                                      ? `Uploading`
                                      : ` Click to Upload Image File`}
                                  </p>
                                </button>
                              )}
                              <div className="mb-3" id="ikUploadWrapper">
                                <IKContext
                                  publicKey={publicKey}
                                  urlEndpoint={urlEndpoint}
                                  authenticator={authenticator}
                                >
                                  <IKUpload
                                    onError={onError}
                                    onSuccess={onSuccess}
                                    onUploadStart={onUploadProgress}
                                    folder={"/cm-products"}
                                    tags={["cm-products"]}
                                    // buttonProps={{ children: "+" }}
                                    // inputRef={inputRefTest}
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={(e) => {
                                      const selectedFile = e.target.files[0];
                                      if (selectedFile) {
                                        if (
                                          !selectedFile.type.startsWith(
                                            "image/"
                                          )
                                        ) {
                                          setAlert({
                                            active: true,
                                            type: "error",
                                            message:
                                              "Please select an image file.",
                                          });
                                          e.target.value = null;
                                        }
                                      }
                                    }}
                                  />
                                </IKContext>
                              </div>
                            </div>
                          </Card>
                          {/* <ErrorMessage
                        name="image"
                        component="div"
                        className="text-red-500"
                      /> */}
                        </div>
                        <div className="mb-3 mt-4 flex flex-1 items-center gap-3">
                          <label
                            htmlFor="checkbox8"
                            className="ml-3 text-sm font-bold text-navy-700 dark:text-white"
                          >
                            Is Active
                          </label>
                          <Switch
                            id="switch8"
                            checked={isActive}
                            onChange={() => setIsActive(!isActive)}
                          />
                        </div>
                      </div>

                      <div className="mb-3 ">
                        <label className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
                          Description*
                        </label>
                        <Field
                          type="string"
                          name="description"
                          className={
                            "mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                          }
                          min="1"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
                          Price*
                        </label>
                        <Field
                          type="number"
                          name="price"
                          className={
                            "mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                          }
                          min="1"
                        />
                        <ErrorMessage
                          name="price"
                          component="div"
                          className="text-red-500"
                        />
                      </div>

                      <button
                        className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                        // onClick={() => navigate("/auth")}
                        type="submit"
                      >
                        {loading ? `Saving...` : `Save`}
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
