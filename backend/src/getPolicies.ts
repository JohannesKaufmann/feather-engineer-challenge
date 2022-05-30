import { Prisma, PrismaClient, PolicyStatus } from "@prisma/client";

const filterSearch = (search: string): Prisma.PolicyWhereInput[] => {
  if (search === "") {
    return [];
  }

  const searchQuery: Prisma.Enumerable<Prisma.PolicyWhereInput> = [
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
    // Filter on the members array, for the firstname and lastname:
    {
      members: {
        some: {
          customer: {
            firstName: { contains: search as string, mode: "insensitive" },
          },
        },
      },
    },
    {
      members: {
        some: {
          customer: {
            lastName: { contains: search as string, mode: "insensitive" },
          },
        },
      },
    },
  ];

  return [
    {
      OR: searchQuery,
    },
  ];
};
const filterStatus = (status: PolicyStatus | ""): Prisma.PolicyWhereInput[] => {
  if (status === "") {
    return [];
  }

  return [
    {
      status: {
        equals: status,
      },
    },
  ];
};

export interface GetPoliciesArgs {
  search: string;
  status: PolicyStatus | "";
}
const getPolicies = async (prisma: PrismaClient, args: GetPoliciesArgs) => {
  // We only want to show ACTIVE and PENDING policies as the user
  // does not care about old policies.
  const NOT: Prisma.PolicyWhereInput = {
    status: {
      in: ["CANCELLED", "DROPPED_OUT"],
    },
  };

  const where = {
    NOT: NOT,
    AND: [...filterSearch(args.search), ...filterStatus(args.status)],
  };

  const policies = await prisma.policy.findMany({
    where,
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
          profileColor: true,
        },
      },
      members: {
        select: {
          customerId: true,
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileColor: true,
            },
          },
        },
      },
    },
  });

  return policies;
};

export default getPolicies;
