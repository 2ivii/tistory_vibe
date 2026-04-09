import { useEffect } from "react";
import { fetchMyInfo } from "./api/authApi";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { getAccessToken } from "./utils/authStorage";

function App() {
  useEffect(() => {
    if (!getAccessToken()) {
      return;
    }

    void fetchMyInfo().catch(() => {
      // Invalid or expired tokens are cleared in the auth API layer.
    });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
