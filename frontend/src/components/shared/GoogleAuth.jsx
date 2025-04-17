// import { app } from "firebase";
// import { Button } from "../../components/ui/button";
// import React from "react";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const GoogleAuth = () => {
//   const auth = getAuth(app);
//   const handleGoogleClick = async () => {
//     const provider = new GoogleAuthProvider();
//     provider.setCustomParameters({prompt: "select_account"})

//     try {
//         const firebaseResponse = await signInWithPopup(auth,provider)
//     } catch (error) {

//     }
//   };
//   return (
//     <div>
//       <Button
//         type="button"
//         className="bg-green-500 w-full mt-2 text-white"
//         onClick={handleGoogleClick}
//       >
//         Continue with Google
//       </Button>
//     </div>
//   );
// };

// export default GoogleAuth;
import { app } from "../../firebase"; // Correct import
import { Button } from "../../components/ui/button";
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinSuccess } from "../../redux/user/userSlice";

const GoogleAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const firebaseResponse = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firebaseResponse.user.displayName,
          email: firebaseResponse.user.email,
          profilePhotoUrl: firebaseResponse.user.photoURL,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signinSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="bg-green-500 w-full mt-2 text-white"
        onClick={handleGoogleClick}
      >
        Continue with Google
      </Button>
    </div>
  );
};

export default GoogleAuth;
