import { Box, Chip, Skeleton, TablePagination } from "@mui/material";
import Card from "components/card";
import { useProduct } from "model/queryCalls/queryCalls";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useProducts } from "./useProduct";
import { BsDatabaseFillX, BsFileEarmarkImage } from "react-icons/bs";
import ModalContainer from "components/modal";

const Products = () => {
  const navigate = useNavigate();

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    onDelete,
    deleteId,
    setDeleteId,
    isVisible,
    setIsVisible,
  } = useProducts();

  const { data: ProductsData, status } = useProduct({ page, rowsPerPage });
  
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="col-span-5 my-10 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
        <div className="flex justify-end">
          <button
            className="linear mb-2 mt-2 h-16 w-32 rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            onClick={() => navigate("/admin/add-product")}
          >
            Add
          </button>
        </div>
        <Card extra={"w-full h-full p-3"}>
          <div className="relative mb-3 items-center justify-between py-10 lg:px-10">
            {status === "loading" ? (
              <Box>
                <Skeleton sx={{ height: 190 }} />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            ) : status === "success" && ProductsData?.data?.length !== 0 ? (
              <>
                <Table className="w-full min-w-full table-auto">
                  <Thead>
                    <Tr>
                      <Th className="border-b border-gray-100 px-5 py-3 text-left">
                        <p className="text-blue-gray-400 text-[13px] font-bold uppercase">
                          Name
                        </p>
                      </Th>
                      <Th className="border-b border-gray-100 px-5 py-3 text-left">
                        <p className="text-blue-gray-400 text-[13px] font-bold uppercase">
                          Image
                        </p>
                      </Th>
                      <Th className="border-b border-gray-100 px-5 py-3 text-left">
                        <p className="text-blue-gray-400 text-[13px] font-bold uppercase">
                          Price
                        </p>
                      </Th>
                      <Th className="border-b border-gray-100 px-5 py-3 text-left">
                        <p className="text-blue-gray-400 text-[13px] font-bold uppercase">
                          Is Active
                        </p>
                      </Th>
                      <Th className="border-b border-gray-100 px-5 py-3 text-center">
                        <p className="text-blue-gray-400 text-[13px] font-bold uppercase">
                          Actions
                        </p>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {ProductsData.data.map((data: any) => (
                      <Tr
                        key={data._id}
                        className="hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20"
                        onClick={() =>
                          navigate(`/admin/product-details/${data._id}`)
                        }
                      >
                        <Td className="border-b border-gray-100  px-5 py-3">
                          <p className="font-semibold">{data.name.en}</p>
                        </Td>
                        <Td className="border-b border-gray-100  px-5 py-3">
                          {data?.image?.url ? (
                            <img
                              src={data?.image.url}
                              alt={data?.name.en}
                              className="h-[50px] w-[50px]"
                            />
                          ) : (
                            <BsFileEarmarkImage className="h-[40px] w-[40px] text-gray-800" />
                          )}
                        </Td>
                        <Td className="border-b border-gray-100  px-5 py-3">
                          <p className="font-semibold">{data.price}</p>
                        </Td>
                        <Td className="border-b border-gray-100  px-5 py-3">
                          <p>
                            {data.isActive ? (
                              <Chip
                                label="Active"
                                color="success"
                                size="small"
                              />
                            ) : (
                              <Chip
                                label="Inactive"
                                color="error"
                                size="small"
                              />
                            )}
                          </p>
                        </Td>
                        <Td className="border-b border-gray-100  px-5 py-3 text-center">
                          <div className="flex items-center gap-2 xl:justify-center">
                            <button
                              onClick={(
                                event: React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                                >
                              ) => {
                                event.stopPropagation();
                                navigate(`/admin/edit-product/${data._id}`);
                              }}
                              className="text-blue-500 hover:underline"
                            >
                              <MdEdit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={(
                                event: React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                                >
                              ) => {
                                event.stopPropagation();
                                setIsVisible(!isVisible);
                                setDeleteId(data?._id);
                              }}
                              className="text-red-500 hover:underline"
                            >
                              <MdDelete className="h-5 w-5" />
                            </button>
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  className="text-sm font-bold text-navy-700 dark:text-white"
                  count={ProductsData.totalDocumentCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            ) : (
              <div className="flex w-full flex-col items-center justify-center">
                <BsDatabaseFillX className="h-16 w-16 text-gray-500" />
                <p className="mt-3 text-sm font-bold text-gray-800">No Data</p>
              </div>
            )}
          </div>
        </Card>
      </div>
      <ModalContainer
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        deleteId={deleteId}
        confirm={onDelete}
      />
    </div>
  );
};

export default Products;
