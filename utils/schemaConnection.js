import { getConnection } from "../db/connectionManager.js";

export const schemaConnection = async (req, modelName, schema) => {
  try {
    const tenantId = req.header("x-domain-name");

    const conn = await getConnection(tenantId);

    const Model =
      (await conn.models[modelName]) || conn.model(modelName, schema);
    return Model;
  } catch (err) {
    throw new Error(`Schema connection error: ${err.message}`);
  }
};
