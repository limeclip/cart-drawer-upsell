import type { ActionFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { deleteCartWidgetScriptTag } from "../lib/scriptTag.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { shop, session, topic, admin } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  if (admin) {
    try {
      await deleteCartWidgetScriptTag(admin);
    } catch (error) {
      console.error("Failed to delete cart widget script tag:", error);
    }
  }

  // Удаляем все данные магазина
  await db.$transaction([
    db.cartEvent.deleteMany({ where: { shop } }),
    db.upsellEvent.deleteMany({ where: { shop } }),
    db.orderEvent.deleteMany({ where: { shop } }),
    db.cartSettings.deleteMany({ where: { shop } }),
    db.shopSubscription.deleteMany({ where: { shop } }),
  ]);
  console.log(`[APP_UNINSTALLED] All data for shop ${shop} deleted`);

  if (session) {
    await db.session.deleteMany({ where: { shop } });
  }

  return new Response();
};

// import type { ActionFunctionArgs } from "react-router";
// import { authenticate } from "../shopify.server";
// import db from "../db.server";
// import { deleteCartWidgetScriptTag } from "../lib/scriptTag.server";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const { shop, session, topic, admin } = await authenticate.webhook(request);

//   console.log(`Received ${topic} webhook for ${shop}`);

//   if (admin) {
//     try {
//       await deleteCartWidgetScriptTag(admin);
//     } catch (error) {
//       console.error("Failed to delete cart widget script tag:", error);
//     }
//   }

//   if (session) {
//     await db.session.deleteMany({ where: { shop } });
//   }

//   return new Response();
// };
