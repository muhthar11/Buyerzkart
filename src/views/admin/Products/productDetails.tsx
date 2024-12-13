import { Box, Skeleton } from "@mui/material";
import Card from "components/card";
import { useOneProduct } from "model/queryCalls/queryCalls";

import { BsBootstrapFill, BsDatabaseFillX } from "react-icons/bs";
import { MdArrowCircleLeft, MdEditSquare } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productData, status } = useOneProduct({ id });

  console.log('productData==', productData);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="col-span-5 my-10 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
        <Card extra={"w-full h-full p-3"}>
          {status === "loading" ? (
            <Box>
              <Skeleton sx={{ height: 190 }} />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ) : status === "success" ? (
            <div className="relative mb-3 items-center justify-between py-5 text-center lg:px-10">
              <div className="mb-auto flex flex-col items-center justify-center">
                <div className="flex w-full flex-row items-center justify-between">
                  <MdArrowCircleLeft
                    className="h-8 w-8 text-navy-700 hover:cursor-pointer hover:text-navy-500 dark:text-white hover:dark:text-gray-600"
                    onClick={() => navigate(-1)}
                  />
                  <MdEditSquare
                    className="h-8 w-8 text-navy-700 hover:cursor-pointer hover:text-navy-500 dark:text-white hover:dark:text-gray-600"
                    onClick={() =>
                      navigate(`/admin/edit-product/${productData._id}`)
                    }
                  />
                </div>
                <div className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[20px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                  {productData?.image && productData?.image.url ? (
                    <img
                      src={productData?.image.url}
                      alt={productData?.name.en}
                      className="h-[75px] w-[75px]"
                    />
                  ) : (
                    <BsBootstrapFill />
                  )}
                </div>
                <h4 className="mb-px mt-3 text-2xl font-bold text-navy-700 dark:text-white">
                  {productData.name.en}
                </h4>

                {/* <p className="px-5 text-center text-base font-normal text-gray-600 md:!px-0 xl:!px-8">
                Supervise your drive space in the easiest way
              </p> */}
              </div>
              <Card extra={"w-full h-full p-3 mt-6"}>
                {/* Cards */}
                <div className="mt-3 grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                      {productData?.description.en}
                    </p>
                  </div>

                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Is Active</p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                      {productData?.isActive ? "Active" : "In Active"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                      {productData?.price}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center">
              <BsDatabaseFillX className="h-16 w-16 text-gray-500" />
              <p className="mt-3 text-sm font-bold text-gray-800">No Data</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
