import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import db from './data/_db.js';
import { typeDefs } from './data/schema_db.js';

// Resolvers: funciones que obtienen los datos solicitados.
const resolvers = {
  Query: {
    categories: () => db.categories,

    category: (_, { CategoryID }) =>
      db.categories.find(
        (category) => category.CategoryID === CategoryID
      ) ?? null,

    products: () => db.products,

    product: (_, { ProductID }) =>
      db.products.find(
        (product) => product.ProductID === ProductID
      ) ?? null,

    suppliers: () => db.suppliers,

    supplier: (_, { SupplierID }) =>
      db.suppliers.find(
        (supplier) => supplier.SupplierID === SupplierID
      ) ?? null,
  },

  Categories: {
    products: (parent) =>
      db.products.filter(
        (product) => product.CategoryID === parent.CategoryID
      ),
  },

  Products: {
    category: (parent) =>
      db.categories.find(
        (category) => category.CategoryID === parent.CategoryID
      ) ?? null,

    supplier: (parent) =>
      db.suppliers.find(
        (supplier) => supplier.SupplierID === parent.SupplierID
      ) ?? null,
  },

  Suppliers: {
    products: (parent) =>
      db.products.filter(
        (product) => product.SupplierID === parent.SupplierID
      ),
  },

  Mutation: {
  addCategory: (_, { CategoryName, Description }) => {

    // Calcular un identificador que no esté en uso.
    const newCategoryID =
      Math.max(0, ...db.categories.map(
        (category) => category.CategoryID
      )) + 1;

    // Construir la nueva categoría.
    const newCategory = {
      CategoryID: newCategoryID,
      CategoryName,
      Description: Description ?? null
    };

    // Guardar la categoría en el arreglo.
    db.categories.push(newCategory);

    // Devolver la categoría creada.
    return newCategory;
  },

  updateCategory: (_, { CategoryID, CategoryName, Description }) => {
  const category = db.categories.find(
    (item) => item.CategoryID === CategoryID
  );

  if (!category) {
    return null;
  }

  if (CategoryName !== undefined) {
    category.CategoryName = CategoryName;
  }

  if (Description !== undefined) {
    category.Description = Description;
  }

  return category;
},

deleteCategory: (_, { CategoryID }) => {
  const index = db.categories.findIndex(
    (item) => item.CategoryID === CategoryID
  );

  if (index === -1) {
    return false;
  }

  // Evitar eliminar categorías que tienen productos asociados.
  const hasProducts = db.products.some(
    (product) => product.CategoryID === CategoryID
  );

  if (hasProducts) {
    throw new Error(
      "No se puede eliminar una categoría que tiene productos asociados."
    );
  }

  db.categories.splice(index, 1);

    return true;
  },
  }
};

// Crear el servidor GraphQL.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Iniciar el servidor HTTP.
const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`Servidor GraphQL disponible en ${url}`);