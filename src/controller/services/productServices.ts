/*  */
/* Brand services */
/*  */

import { app, getDBInstance, ObjectId } from "./dbServices";

export const addProduct = async ({ values, isActive, image }: any) => {
  if (!app || !app.currentUser) {
    return;
  }
  if (!values) {
    return;
  }

  const result = await getDBInstance()
    .collection("Products")
    .insertOne({
      name: {
        en: values.name,
      },
      description: {
        en: values.description,
      },
      price:values.price,
      isActive,
      image,
      dateCreated: new Date(),
      dateModified: null,
      order: values.order,
    });
  return result;
};

export const updateProduct = async ({ id, values, isActive, image }: any) => {
  if (!app || !app.currentUser) {
    return;
  }
  if (!id || !values) {
    return;
  }
  if (typeof id === "string") {
    id = new ObjectId(id);
  }

  const result = await getDBInstance()
    .collection("Products")
    .updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name: {
            en: values.name,
          },
          description: {
            en: values.description,
          },
          price:values.price,
          isActive,
          image: image ? image : {},
          dateModified: new Date(),
          order: values.order,
        },
      }
    );

  return result;
};

export const getProducts = async ({ page = 0, rowsPerPage = 10 }: any) => {
  if (!app || !app.currentUser) {
    return;
  }
  const skip = page * rowsPerPage;
  const limit = rowsPerPage;

  const totalDocumentCount = await getDBInstance()
    .collection("Products")
    .count({});

  const result = await getDBInstance()
    .collection("Products")
    .aggregate([
      {
        $match: {},
      },
      {
        $sort: {
          order: 1,
        },
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          isActive: 1,
          dateCreated: 1,
          dateModified: 1,
          price: 1,
          description: 1,
          image: {
            url: 1,
            name: 1,
          },
        },
      },
    ]);

  return { data: result, totalDocumentCount };
};

export const getOneProduct = async ({ id }: any) => {
  if (!app || !app.currentUser) {
    return;
  }
  if (!id) {
    return;
  }
  if (typeof id === "string") {
    id = new ObjectId(id);
  }

  const result = await getDBInstance()
    .collection("Products")
    .aggregate([
      {
        $match: { _id: id },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);
  return result[0];
};

export const DeleteProduct = async ({ id }: any) => {
  if (!app || !app.currentUser) {
    return;
  }
  if (typeof id === "string") {
    id = new ObjectId(id);
  }

  const result = await getDBInstance()
    .collection("Products")
    .deleteOne({ _id: id });

  return result;
};
