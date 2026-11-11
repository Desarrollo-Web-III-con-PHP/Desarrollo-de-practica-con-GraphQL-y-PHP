export const typeDefs = `#graphql

  type Categories {
    CategoryID: Int!
    CategoryName: String!
    Description: String
    products: [Products!]!
  }

  type Products {
    ProductID: Int!
    ProductName: String!
    SupplierID: Int!
    CategoryID: Int!
    UnitPrice: Float
    category: Categories
    supplier: Suppliers
  }

  type Suppliers {
    SupplierID: Int!
    CompanyName: String!
    ContactName: String
    Country: String
    products: [Products!]!
  }

  type Query {
    categories: [Categories!]!
    category(CategoryID: Int!): Categories

    products: [Products!]!
    product(ProductID: Int!): Products

    suppliers: [Suppliers!]!
    supplier(SupplierID: Int!): Suppliers
  }

    type Mutation {
        addCategory(
            CategoryName: String!
            Description: String
        ): Categories!

        updateCategory(
            CategoryID: Int!
            CategoryName: String
            Description: String
        ): Categories

        deleteCategory(
            CategoryID: Int!
        ): Boolean!
    }

`;