-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP(3),
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "accountOwner" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT,
    "collaborator" BOOLEAN DEFAULT false,
    "emailVerified" BOOLEAN DEFAULT false,
    "refreshToken" TEXT,
    "refreshTokenExpires" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopSubscription" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "planName" TEXT NOT NULL DEFAULT 'starter',
    "orderLimit" INTEGER NOT NULL DEFAULT 99,
    "orderCount" INTEGER NOT NULL DEFAULT 0,
    "trialEndsAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShopSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_settings" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "buttonColor" TEXT NOT NULL DEFAULT '#000000',
    "buttonTextKey" TEXT NOT NULL DEFAULT 'checkout',
    "enableTimer" BOOLEAN NOT NULL DEFAULT false,
    "timerMinutes" INTEGER NOT NULL DEFAULT 5,
    "enableFreeShippingBar" BOOLEAN NOT NULL DEFAULT true,
    "freeShippingThreshold" DOUBLE PRECISION NOT NULL DEFAULT 50.0,
    "enableGiftWrap" BOOLEAN NOT NULL DEFAULT false,
    "giftWrapPrice" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "enableUpsell" BOOLEAN NOT NULL DEFAULT false,
    "upsellProductIds" JSONB NOT NULL DEFAULT '[]',
    "enableDynamicDiscounts" BOOLEAN NOT NULL DEFAULT false,
    "discountRules" JSONB NOT NULL DEFAULT '[]',
    "modules" JSONB NOT NULL DEFAULT '{}',
    "moduleOrder" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartEvent" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpsellEvent" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "orderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UpsellEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderEvent" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopSubscription_shop_key" ON "ShopSubscription"("shop");

-- CreateIndex
CREATE UNIQUE INDEX "cart_settings_shop_key" ON "cart_settings"("shop");

-- CreateIndex
CREATE INDEX "CartEvent_shop_idx" ON "CartEvent"("shop");

-- CreateIndex
CREATE INDEX "CartEvent_cartId_idx" ON "CartEvent"("cartId");

-- CreateIndex
CREATE INDEX "CartEvent_eventType_idx" ON "CartEvent"("eventType");

-- CreateIndex
CREATE INDEX "UpsellEvent_shop_idx" ON "UpsellEvent"("shop");

-- CreateIndex
CREATE INDEX "UpsellEvent_productId_idx" ON "UpsellEvent"("productId");

-- CreateIndex
CREATE INDEX "UpsellEvent_eventType_idx" ON "UpsellEvent"("eventType");

-- CreateIndex
CREATE INDEX "OrderEvent_shop_idx" ON "OrderEvent"("shop");

-- CreateIndex
CREATE INDEX "OrderEvent_orderId_idx" ON "OrderEvent"("orderId");

-- AddForeignKey
ALTER TABLE "cart_settings" ADD CONSTRAINT "cart_settings_shop_fkey" FOREIGN KEY ("shop") REFERENCES "ShopSubscription"("shop") ON DELETE RESTRICT ON UPDATE CASCADE;
