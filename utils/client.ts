import sanityClient from '@sanity/client';

const connectorInfo = {
	projectId: '8421wzuo',
	dataset: 'production',
	apiVersion: '2022-12-19',
	useCdn: false,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};
console.log(connectorInfo.token);

export const client = sanityClient(connectorInfo);

