import express from "express";
import { PrismaClient, PolicyStatus } from "@prisma/client";
import getPolicies, { GetPoliciesArgs } from "./getPolicies";
import { getQueryArgument } from "./queryArgs";

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/policies", async (req, res) => {
  const args: GetPoliciesArgs = {
    search: getQueryArgument(req.query, "search"),
    status: getQueryArgument(req.query, "status") as PolicyStatus | "",
  };

  const policies = await getPolicies(prisma, args);

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(policies);
});

app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
