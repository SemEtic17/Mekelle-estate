import { useSelector } from "react-redux";
import { Button, TextInput, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import { app } from "../firebase"
import "react-circular-progressbar/dist/styles.css";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [filePerc, setFilePerc] = useState(0);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({});

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

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
          // onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          // onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          // onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          // disabled={loading || imageFileUploading}
        >
          Update
        </Button>
      </form>
      <div className="text-red-700 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">
          <Link to="/">Sign Out</Link>
        </span>
      </div>
    </div>
  );
}
