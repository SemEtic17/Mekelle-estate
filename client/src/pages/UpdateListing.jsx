import {
  Alert,
  Button,
  Checkbox,
  FileInput,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <TextInput
            type="text"
            id="name"
            placeholder="Name"
            className="p-3"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <Textarea
            type="text"
            id="description"
            placeholder="Description"
            className="p-3 ml-3 w-[24rem]"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <TextInput
            type="text"
            id="address"
            placeholder="Address"
            className="p-3"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <Checkbox
                id="sale"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <Label htmlFor="sale">Sell</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                id="rent"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <Label htmlFor="rent">Rent</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
              />
              <Label htmlFor="parking">Parking spot</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <Label htmlFor="furnished">Furnished</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
              />
              <Label htmlFor="offer">Offer</Label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg w-[60px] h-10"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg w-[60px] h-10"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg w-[60px] h-10"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg w-[60px] h-10"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gary-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex flex-row">
            <FileInput
              onChange={(e) => setFiles(e.target.files)}
              id="file"
              className="p-3 w-full"
              accept="image/*"
              multiple
            />
            <Button
              onClick={handleImageSubmit}
              type="button"
              className="disabled:opacity-80 h-[42px] mt-3 mb-0"
              disabled={uploading}
              gradientDuoTone="greenToBlue"
              outline
            >
              {uploading ? (
                <div className="flex flex-row gap-2 justify-center">
                  <p>Uploading</p>
                  <div className="w-2 h-2 rounded-full bg-black animate-bounce mt-3"></div>
                  <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-.3s] mt-3"></div>
                  <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-.5s] mt-3"></div>
                </div>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
          {imageUploadError && (
            <Alert color="failure" className="mt-5">
              {imageUploadError}
            </Alert>
          )}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded"
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  color="failure"
                >
                  Delete
                </Button>
              </div>
            ))}
          <Button
            gradientDuoTone="greenToBlue"
            outline
            type="submit"
            disabled={loading || uploading}
          >
            {loading ? (
              <div className="flex flex-row gap-2 justify-center">
                <p>Updating</p>
                <div className="w-2 h-2 rounded-full bg-black animate-bounce mt-3"></div>
                <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-.3s] mt-3"></div>
                <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-.5s] mt-3"></div>
              </div>
            ) : (
              "Update Listing"
            )}
          </Button>
          {error && (
            <Alert color="failure" className="mt-5">
              {error}
            </Alert>
          )}
        </div>
      </form>
    </main>
  );
}
