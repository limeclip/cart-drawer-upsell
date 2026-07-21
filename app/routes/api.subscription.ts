import type { LoaderFunctionArgs } from "react-router";



import { getShopSubscription } from "../lib/subscription.server";

import { authenticate } from "../shopify.server";



export const loader = async ({ request }: LoaderFunctionArgs) => {

  try {

    const { session } = await authenticate.admin(request);

    const subscription = await getShopSubscription(session.shop);



    return Response.json(subscription);

  } catch (error) {

    return Response.json(

      {

        error:

          error instanceof Error

            ? error.message

            : "Failed to load subscription",

      },

      { status: 500 },

    );

  }

};

