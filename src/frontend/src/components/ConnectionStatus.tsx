/**
 * ConnectionStatus — Listens to online/offline events and shows a toast
 * when the browser loses or regains its network connection.
 * Mount once near the app root; it renders no visible DOM by itself.
 */
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function ConnectionStatus() {
  const toastId = useRef<string | number | undefined>(undefined);

  useEffect(() => {
    function handleOffline() {
      toastId.current = toast.loading("Reconnecting to Spiritual Connect…", {
        description: "Please wait while we restore your connection.",
        duration: Number.POSITIVE_INFINITY,
        id: "connection-status",
      });
    }

    function handleOnline() {
      if (toastId.current !== undefined) {
        toast.dismiss("connection-status");
        toastId.current = undefined;
      }
      toast.success("Connection restored", {
        description: "You are back online. 🙏",
        duration: 3000,
      });
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null;
}
