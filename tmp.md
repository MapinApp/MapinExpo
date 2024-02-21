I fetch the Google Image Data as follows:

```ts
// Fetch the image from the URL provided by Google Places API if we have a URL
const response = await fetch(photoDetails.places_photo_url);
const imageBlob = (await response.blob()) as FileBody; // Convert to Blob for uploading
console.log(imageBlob);
// It should return on status:200 an actual image resource
const imagePath = `${details.place_id}.jpg`;
console.log(imagePath);
// Upload the image to Supabase Storage
let result = await uploadPlaceImage(imageBlob, imagePath);
result && (photoDetails.places_photo_url = result);
```

and then use this function:

```ts
const uploadPlaceImage = async (image: FileBody, imagePath: string) => {
  // Upload the image to Supabase Storage
  try {
    // Utility function to upload an image to Supabase and return the URL
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("places")
      .upload(imagePath, image, {
        cacheControl: "3600",
        upsert: false,
      });
    if (uploadError) {
      console.log("Error uploading image to Supabase:", uploadError.message);
      throw new Error(uploadError.message);
    }
    const { data, error: downloadError } = await supabase.storage
      .from("places")
      .download(imagePath);
    if (downloadError) {
      throw downloadError;
    }
    const fr = new FileReader();
    fr.readAsDataURL(data);
    fr.onload = () => {
      return fr.result as string;
    };
  } catch (error) {
    console.error("Error uploading image to Supabase:", error);
    return null;
  }
};
```

What is causing the error "[TypeError: Network request failed]"?
