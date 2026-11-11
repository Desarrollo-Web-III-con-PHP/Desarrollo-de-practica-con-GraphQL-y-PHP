const categories = [
  {
    CategoryID: 1,
    CategoryName: "Beverages",
    Description: "Soft drinks, coffees, teas, beers, and ales"
  },
  {
    CategoryID: 2,
    CategoryName: "Condiments",
    Description: "Sweet and savory sauces, relishes, spreads, and seasonings"
  },
  {
    CategoryID: 3,
    CategoryName: "Confections",
    Description: "Desserts, candies, and sweet breads"
  }
];

const products = [
  {
    ProductID: 1,
    ProductName: "Chai",
    SupplierID: 1,
    CategoryID: 1,
    UnitPrice: 18
  },
  {
    ProductID: 2,
    ProductName: "Chang",
    SupplierID: 1,
    CategoryID: 1,
    UnitPrice: 19
  },
  {
    ProductID: 3,
    ProductName: "Aniseed Syrup",
    SupplierID: 1,
    CategoryID: 2,
    UnitPrice: 10
  }
];

const suppliers = [
  {
    SupplierID: 1,
    CompanyName: "Exotic Liquids",
    ContactName: "Charlotte Cooper",
    Country: "UK"
  }
];

export default {
  categories,
  products,
  suppliers
};