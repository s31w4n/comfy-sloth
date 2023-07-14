// domain/.netlify/functions/hello

// exports.handler = async function (event, context) {
//   return {
//     statusCode: 200,
//     body: 'Hello World!',
//   };
// };

// domain/.netlify/functions/create-payment-intent
import { APIGatewayEvent, Context } from 'aws-lambda';

export async function handler(event: APIGatewayEvent, context: Context) {
  const { msg } = event.queryStringParameters!;
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msg }),
  };
}
