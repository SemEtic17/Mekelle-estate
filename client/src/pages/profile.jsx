import { useSelector, useDispatch } from "react-redux";
import { Button, TextInput, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import { app } from "../firebase"
import { updateUserStart, updateUserFailure, updateUserSuccess } from "../redux/user/userSlice";
import "react-circular-progressbar/dist/styles.css";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [filePerc, setFilePerc] = useState(0);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
      },
    (error)=>{
      setFileUploadError(
        'Could not upload image (File must be less than 2MB)'
      );
    },
    ()=> {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, avatar: downloadURL });
      });
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setUpdateUserError(null);
    // setUpdateUserSuccess(null);
    // if (Object.keys(formData).length === 0) {
    //   setUpdateUserError('No changes made');
    //   return;
    // }
    // if (imageFileUploading) {
    //   setUpdateUserError('Please wait for image to upload');
    //   return;
    // }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {filePerc > 0 && filePerc < 100 && (
            <CircularProgressbar
              value={filePerc || 0}
              text={`${filePerc}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    filePerc / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={ formData.avatar || currentUser.avatar}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              filePerc &&
              filePerc < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {fileUploadError && (
          <Alert color='failure'>{fileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading}
        >
          {loading ? <div className="flex flex-row gap-2 justify-center">
            <p>Loading</p>
  <div className="w-2 h-2 rounded-full bg-black animate-bounce mt-3"></div>
  <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-.3s] mt-3"></div>
  <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-.5s] mt-3"></div>
</div> : "Update"}
        </Button>
      </form>
      <div className="text-red-700 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">
          <Link to="/">Sign Out</Link>
        </span>
      </div>
      {updateSuccess && (
        <Alert color='success' className='mt-5'>
          User's profile updated successfully
        </Alert>
      )}
       {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
    </div>
  );
}
