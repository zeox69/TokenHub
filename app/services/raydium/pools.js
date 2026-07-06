export async function getAvailablePools(raydium) {
  try {
    return await raydium.api.getPoolList({});
  } catch (error) {
    console.error(error);
    return [];
  }
}