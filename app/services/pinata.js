export async function uploadFileToPinata(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/pinata/upload-file", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to IPFS");
  }

  return await response.json();
}

export async function uploadMetadataToPinata(metadata) {
  const response = await fetch("/api/pinata/upload-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(metadata),
  });

  if (!response.ok) {
    throw new Error("Failed to upload metadata");
  }

  return await response.json();
}