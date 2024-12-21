import openDatabase from './open_db'
import { kpis as kpiData,products as productData,transactions as transactionData } from "../data/seed" 
export async function loadDataIntoIndexedDB() {
  const db = await openDatabase();

  const insertData = async (storeName, data) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
  
    for (const item of data) {
      await store.put(item); // Insert or update records
    }
  
    await transaction.done;
  };
  

  await insertData("kpis", kpiData);
  await insertData("products", productData);
  await insertData("transactions", transactionData);

  console.log("Data successfully loaded into IndexedDB");
}

 loadDataIntoIndexedDB().catch((error) =>
   console.error("Error loading data into IndexedDB:", error)
 );
