import mongoose from "mongoose";
import DB from "../module/dburl/dburl.schema.js";

// Reusable admin connection
let adminConn = null;

// Get or create the admin connection
const getAdminConnection = async () => {
  if (adminConn) return adminConn;

  adminConn = await mongoose.createConnection("mongodb://localhost:27017", {
    dbName: "adminDb",
  });

  // Register DB model once
  if (!adminConn.models.DB) {
    adminConn.model("DB", DB.schema);
  }

  return adminConn;
};

// Main reusable connection getter
export const getConnection = async (tenantId) => {
  // If no tenantId, return admin connection
  if (!tenantId) {
    return await getAdminConnection();
  }

  // Get DB config from admin DB
  const admin = await getAdminConnection();
  const DbModel = admin.model("DB");
  const dbRecord = await DbModel.findById(tenantId).lean();

  if (!dbRecord) {
    throw new Error(
      `No database configuration found for tenant ID: ${tenantId}`
    );
  }

  const dbUrl = `mongodb+srv://${dbRecord.username}:${dbRecord.password}@cluster0.9leifvx.mongodb.net/${dbRecord.dbName}?retryWrites=true&w=majority&appName=Cluster0`;

  // Create a new connection to tenant DB
  const tenantConn = await mongoose.createConnection(dbUrl);

  return tenantConn;
};
