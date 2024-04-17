-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "children" INTEGER NOT NULL,
    "adults" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeString" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Time_time_key" ON "Time"("time");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_timeString_fkey" FOREIGN KEY ("timeString") REFERENCES "Time"("time") ON DELETE RESTRICT ON UPDATE CASCADE;
