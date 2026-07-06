export async function POST(req) {
  try {
    const formData = await req.formData();

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: formData,
    });

    const data = await response.json();

    console.log("Pinata status:", response.status);
    console.log("Pinata response:", data);

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}