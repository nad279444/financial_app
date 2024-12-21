
import { openDB } from "idb";

export default async function openDatabase() {
  return openDB("dashboardData", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("kpis")) {
        db.createObjectStore("kpis", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("products")) {
        db.createObjectStore("products", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("transactions")) {
        db.createObjectStore("transactions", { keyPath: "id" });
      }
    },
  });
}

// export async function loadDataIntoIndexedDB() {
//   const db = await openDatabase();

//   const insertData = async (storeName, data) => {
//     const transaction = db.transaction(storeName, "readwrite");
//     const store = transaction.objectStore(storeName);
  
//     for (const item of data) {
//       await store.put(item); // Insert or update records
//     }
  
//     await transaction.done;
//   };
  

//   await insertData("kpis", kpiData);
//   await insertData("products", productData);
//   await insertData("transactions", transactionData);

//   console.log("Data successfully loaded into IndexedDB");
// }

// // loadDataIntoIndexedDB().catch((error) =>
// //   console.error("Error loading data into IndexedDB:", error)
// // );
