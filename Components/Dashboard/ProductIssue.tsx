import { useState, useEffect, useRef } from "react";
import {
  collection,
  getDoc,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import { PlusIcon, MinusIcon, XIcon } from "@heroicons/react/solid";

interface Product {
  Product_ID: number;
  Product_Name: string;
  Quantity_Present: number;
  Minimum_Threshold: number;
}

interface TableProduct extends Product {
  Quantity_Issue: number;
}

export default function ProductIssue() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [tableProducts, setTableProducts] = useState<TableProduct[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [searchResultsState, setSearchResultsState] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const getProducts = () => {};
  useEffect(() => {
    const productsCollection = collection(db, "products");
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productList: Product[] = snapshot.docs.map(
        (doc) => doc.data() as Product
      );
      setProducts(productList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let results = products.filter(
      (product) =>
        product.Product_Name.toLowerCase().includes(search.toLowerCase()) &&
        product.Quantity_Present >= product.Minimum_Threshold
    );
    if (activeProduct) results = [];
    setSearchResultsState(results);
  }, [search, products, activeProduct]);

  const handleSearchSelect = (product: Product) => {
    setActiveProduct(product);
    setSearch(product.Product_Name);
    searchRef.current!.blur();
  };

  const handleAddProduct = () => {
    if (activeProduct) {
      const existingProduct = tableProducts.find(
        (product) => product.Product_ID === activeProduct.Product_ID
      );

      if (!existingProduct && activeProduct.Quantity_Present > 0) {
        setTableProducts([
          ...tableProducts,
          {
            ...activeProduct,
            Quantity_Issue: 1,
          },
        ]);
      }

      setSearch("");
      setActiveProduct(null);
    }
  };

  const handleIssueQuantity = (id: number, action: "increase" | "decrease") => {
    setTableProducts((prev) =>
      prev.map((product) => {
        if (product.Product_ID === id) {
          const updatedQuantityIssue =
            action === "increase"
              ? product.Quantity_Issue + 1
              : product.Quantity_Issue - 1;

          if (
            updatedQuantityIssue >= 1 &&
            updatedQuantityIssue <= product.Quantity_Present
          ) {
            return { ...product, Quantity_Issue: updatedQuantityIssue };
          }
        }
        return product;
      })
    );
  };

  const handleRemoveProduct = (id: number) => {
    setTableProducts((prev) =>
      prev.filter((product) => product.Product_ID !== id)
    );
  };

  const handleReset = () => {
    setTableProducts([]);
  };

  const handleIssue = async () => {
    try {
      setIsLoading(true);
      const updatedProducts: Product[] = [];
      const updatedTableProducts: TableProduct[] = [];

      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;

      for (const product of tableProducts) {
        const productRef = doc(db, "products", product.Product_ID.toString());
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const currentProduct: Product = productSnapshot.data() as Product;
          const updatedQuantityPresent =
            currentProduct.Quantity_Present - product.Quantity_Issue;

          if (updatedQuantityPresent >= 0) {
            updatedProducts.push({
              ...currentProduct,
              Quantity_Present: updatedQuantityPresent,
            });
            updatedTableProducts.push(product);

            await updateDoc(productRef, {
              Quantity_Present: updatedQuantityPresent,
            });

            const issueData = {
              Product_ID: product.Product_ID,
              Product_Name: product.Product_Name,
              Qty: product.Quantity_Issue,
              Date: formattedDate,
              Time: serverTimestamp(),
            };

            const issuesRef = collection(db, "issues");
            await addDoc(issuesRef, issueData);
          }
        }
      }

      // setProducts(updatedProducts);
      setTableProducts(updatedTableProducts);
      handleReset();
    } catch (error) {
      console.error("Error issuing products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 w-full min-w-[30rem]">
      <h1 className="text-3xl px-4 font-bold text-blue-600 mt-5 mb-6">
        Issue Products
      </h1>
      <div className="border p-4 rounded">
        <div className="mb-8">
          <input
            ref={searchRef}
            type="text"
            className="border-2 border-gray-300 rounded-lg py-2 px-4 w-full"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="relative">
            {search.length > 0 && searchResultsState.length > 0 && (
              <div className="absolute z-20 top-full w-full bg-white border-2 border-gray-300 rounded-lg py-2 z-10 max-h-[300px] overflow-y-scroll">
                {searchResultsState.map((product) => (
                  <div
                    key={product.Product_ID}
                    className="px-4 py-2  hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSearchSelect(product)}
                  >
                    {product.Product_Name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className={`mt-2 ${
              activeProduct ? "bg-blue-500" : "bg-gray-300"
            } text-white py-2 px-4 rounded-lg w-full`}
            onClick={handleAddProduct}
            disabled={!activeProduct}
          >
            <PlusIcon className="h-6 w-6 inline-block mr-2" /> Add Product
          </button>
        </div>
        <div className="overflow-auto h-[220px] border overflow-y-scroll">
          <table className="w-full mb-4">
            <thead>
              <tr className=" sticky top-0 bg-white z-10">
                <th className="pb-2 border-b-2 border-gray-200">S.No.</th>
                <th className="pb-2 border-b-2 border-gray-200">ID</th>
                <th className="pb-2 border-b-2 border-gray-200">Name</th>
                <th className="pb-2 border-b-2 border-gray-200">Qty</th>
                <th className="pb-2 border-b-2 border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableProducts.map((product, idx) => (
                <tr key={product.Product_ID} className="border-b text-center">
                  <td className="py-2">{idx + 1}</td>
                  <td className="py-2">{product.Product_ID}</td>
                  <td className="py-2">{product.Product_Name}</td>
                  <td className="py-2 flex items-center justify-center">
                    <button
                      className="mr-2"
                      onClick={() =>
                        handleIssueQuantity(product.Product_ID, "decrease")
                      }
                      disabled={product.Quantity_Issue <= 1}
                    >
                      <MinusIcon className="h-6 w-6 text-blue-500" />
                    </button>
                    <span>{product.Quantity_Issue}</span>
                    <button
                      className="ml-2"
                      onClick={() =>
                        handleIssueQuantity(product.Product_ID, "increase")
                      }
                      disabled={
                        product.Quantity_Issue >= product.Quantity_Present
                      }
                    >
                      <PlusIcon className="h-6 w-6 text-blue-500" />
                    </button>
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => handleRemoveProduct(product.Product_ID)}
                    >
                      <XIcon className="h-6 w-6 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
        <div className="flex mt-2 justify-between">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
            onClick={handleIssue}
            disabled={tableProducts.length === 0}
          >
            {isLoading ? "Issuing..." : "Issue"}
          </button>
        </div>
      </div>
    </div>
  );
}
