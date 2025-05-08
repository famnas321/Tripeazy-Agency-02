import { useEffect, useState } from "react";
import { addLike } from "src/services/authService";
import { useSelector } from "react-redux";

const Like = ({ packageId, like, likedBy, onToggle,likeCount }) => {
  const [countOfLike, setCountOfLike]= useState(likeCount)
  const authData = useSelector((state) => state.auth.userInfo);
  const [localHasLiked, setLocalHasLiked] = useState(false);
  const filled = "#000000";

 
  useEffect(() => {
    const serverHasLiked = likedBy.some(item => item.user === authData._id && item.status=== true);

    setLocalHasLiked(serverHasLiked);
  }, [likedBy, authData._id]);
  
 
  // console.log(localHasLiked,"this is just below of the useEffect")
  const handletoggle = async () => {
   const newStatus = !localHasLiked;
    setLocalHasLiked(newStatus);
    
    try {
      
      const response=  await addLike({ status: newStatus, packageId });
      console.log(response.message,"this is the liked response")
      
      if(response.message === "Liked"){
        setLocalHasLiked(true)
       setCountOfLike(countOfLike+1)
      }else{
        setLocalHasLiked(false)
        setCountOfLike(countOfLike-1)
      }
      
    } catch (error) {
      console.error("Like API Error:", error);
     
      setLocalHasLiked(!newStatus);
    }
  };

  return (
    <>
    <svg
      fill={localHasLiked ? filled : "none"}
      stroke={filled}
      onClick={handletoggle}
      height={24}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
     <p>{countOfLike}</p>
     </>
  );
};

export default Like;