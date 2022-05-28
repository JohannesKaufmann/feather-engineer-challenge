-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "profileColor" TEXT NOT NULL DEFAULT E'#dbdbdb';

-- CreateTable
CREATE TABLE "PolicyMember" (
    "policyId" UUID NOT NULL,
    "customerId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PolicyMember_policyId_customerId_key" ON "PolicyMember"("policyId", "customerId");

-- AddForeignKey
ALTER TABLE "PolicyMember" ADD CONSTRAINT "PolicyMember_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyMember" ADD CONSTRAINT "PolicyMember_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
