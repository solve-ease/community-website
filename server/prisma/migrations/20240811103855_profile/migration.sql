-- CreateTable
CREATE TABLE "user_profiles" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "birthday" TIMESTAMP(3),
    "bio" TEXT,
    "skills" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additional_details" (
    "id" SERIAL NOT NULL,
    "education" TEXT,
    "occupation" TEXT,
    "interests" TEXT,
    "languages" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "website" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "additional_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "additional_details_userId_key" ON "additional_details"("userId");

-- AddForeignKey
ALTER TABLE "additional_details" ADD CONSTRAINT "additional_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
