import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import { getuser, updatephoto, updateuser } from '../../redux/features/auth/authSlice';
import './profile.scss';
const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset =process.env.REACT_APP_UPLOAD_PRESET;
//some chnage for git help

const Profile = () => {
  // Retrieve user data from Redux state
  const {  user, isError, isSuccess , isLoggedIn } = useSelector((state) => state.auth);

  // Initialize profile state with user data
  const initialState = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || '',
    photo: user?.photo || '', 
    address: user?.address || {
      
      address: user?.address?.address ||  "",
      state: user?.address?.state ||  "",
      country: user?.address?.country ||  "",
    },
  };

  // State to manage the profile data
  const [profile, setProfile] = useState(initialState);
  const [ profileImage , setProfileImage] =useState(null);
  const [ imagePreview,  setImagePreview] =useState(null);
  const dispatch = useDispatch();

  // Handler for saving the profile (update as needed)
  const saveProfile = async (e) => {
    // Implement save logic here
    e.preventDefault();
    const userData ={
      name: profile.name,
      phone: profile.phone,
      address :{
        address: profile.address,
        state: profile.state,
        country: profile.country,
        
      }
      
    }
    if(isSuccess && isLoggedIn )
    {
      toast.success("update user sucesfully")
    }
    else{
      toast.error("failed Updated");
    }
    console.log(userData);
    await dispatch(updateuser(userData));
    
  };
  

  // Handler for handling image changes (update as needed)
  const handleImageChange = (e) => {
    // Implement image change logic here
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // Handler for handling input changes (update as needed)
  const handleInputChange = (e) => {
    // Update the corresponding field in the profile state
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };
useEffect (() =>{
  if(user === null)
  {
   dispatch(getuser)}
},[dispatch, user]
);
useEffect (() =>{
  if(user)
  { setProfile({
    
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || '',
      photo: user?.photo|| '',
      address: user?.address || {
        address: user?.address?.address ||  "",
        state: user?.address?.state ||  "",
        country: user?.address?.country ||  "",
      },
  })
   }
},[user ]
);
const savePhoto = async(e) =>{
  e.preventDefault();
  let imageURL ;
  try{

    if(profileImage !== null &&
      (profileImage.type === "image/jpeg" ||profileImage.type === "image/jpeg" ||
      profileImage.type === "image/png"))
      {
        const image = new FormData()
        image.append("file" , profileImage);
        image.append("cloud_name" ,cloud_name);
        image.append("upload_preset" , upload_preset);
        //saving image to cloudinary 
         const response = await fetch("https://api.cloudinary.com/v1_1/dkrarj6gn/image/upload" , {method: "post" , body:image});
         const imgData = await  response.json();
         console.log(imgData);
         imageURL = imgData.url.toString()

      }
      //save iumage to mono db 
       const userData ={
        photo: profileImage ? imageURL : profile.photo
       }
       await dispatch(updatephoto(userData))
       setImagePreview(null)

  }catch(error)
  {
    toast.error(error.message);
  }

}
 return (
    <>
      <section >
        <div className="container">
          <h2> Profile</h2>
          <div className="--flex-start profile center-section">
            <Card cardClass="card">
              <div className='--center-all'>
              <div className="profile-photo">
                <div>
                  <img src={imagePreview === null ? user?.photo : imagePreview } alt="profile" />
                </div>
                <h3> Role: {profile.role} </h3>
                {imagePreview !== null &&(<button className='--btn --btn-secondary' onClick={savePhoto}>
                  Upload Photo
                  </button>)}
              </div>
              </div>
              <form onSubmit={saveProfile}>
                {/* File input for profile image */}
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                  />
                </label>
                {/* Input fields for profile information */}
                <p>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={profile?.name}
                    onChange={handleInputChange}
                    required
                  />
                </p>
                <p>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={profile?.email}
                    onChange={handleInputChange}
                    required
                  />
                </p>
                <p>
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile?.phone}
                    onChange={handleInputChange}
                    required
                  />
                </p>
                <p>
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={profile?.address?.address}
                    onChange={handleInputChange}
                    required
                  />
                </p>
                <p>
                  <label>State:</label>
                  <input
                    type="text"
                    name="state"
                    value={profile?.address?.state}
                    onChange={handleInputChange}
                    required
                  />
                </p>
                <p>
                  <label>Country:</label>
                  <input
                    type="text"
                    name="country"
                    value={profile?.address?.country}
                    onChange={handleInputChange}
                    required
                  />
                </p>
                {/* Button to update the profile */}
                <button className="--btn --btn-primary --btn-block" type="submit" >
                  Update Profile
                </button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
export  const UserName =()=>{
  const {  user } = useSelector((state) => state.auth);
  const username = user?.name 
  return (
    <span style={{color: "#ff7722"}}> Hi, {username} </span>
  )
}

export default Profile;
