import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect } from "react";

export default function () {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      "585822882944-jjh2gv7jdj1dl3ef8fu5e85nfh06ek6f.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access). Required to get the `idToken` on the user object!
  });

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log("getCurrentUserInfo ", { userInfo });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log("getCurrentUser ", { currentUser });
  };

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log(JSON.stringify(userInfo));
          // console.log(userInfo);
        } catch (error: any) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log("cancelled", error);
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(
              " operation (e.g. sign in) is in progress already",
              error
            );
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log(" play services not available or outdated ", error);
          } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            console.log("SIGN_IN_REQUIRED ", error);
          } else {
            // some other error happened
            console.log("other ", error);
          }
        }
      }}
    />
  );
}
