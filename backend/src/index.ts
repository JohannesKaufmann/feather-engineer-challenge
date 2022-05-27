import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/policies", async (req, res) => {
  const { search } = req.query;

  const assemblePoliciesWhere = (
    search: string | undefined
  ): Prisma.PolicyWhereInput => {
    // We only want to show ACTIVE and PENDING policies as the user
    // does not care about old policies.
    const NOT: Prisma.PolicyWhereInput = {
      status: {
        in: ["CANCELLED", "DROPPED_OUT"],
      },
    };

    // Break-out early if the user is not searching
    if (!search || search === "") {
      return { NOT };
    }

    return {
      NOT,
      OR: [
        { provider: { contains: search as string, mode: "insensitive" } },
        {
          customer: {
            firstName: { contains: search as string, mode: "insensitive" },
          },
        },
        {
          customer: {
            lastName: { contains: search as string, mode: "insensitive" },
          },
        },
      ],
    };
  };

  const policies = await prisma.policy.findMany({
    where: assemblePoliciesWhere(search as string | undefined),
    select: {
      id: true,
      provider: true,
      insuranceType: true,
      status: true,
      startDate: true,
      endDate: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
      },
    },
  });

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json(policies);
});

app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
