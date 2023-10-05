import { PineconeClient } from '@pinecone-database/pinecone';

export const getPineconeClient = async () => {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: 'us-west4-gcp-free',
  });
  return client;
};

// import { Pinecone } from '@pinecone-database/pinecone';
// export const getPineconeClient = async () => {
//   const pinecone = new Pinecone({
//     environment: 'us-west4-gcp-free',
//     apiKey: process.env.PINECONE_API_KEY!,
//   });
//   const data = await pinecone.Index('pdf-test')
//   console.log(data);

//   return pinecone;
// };
