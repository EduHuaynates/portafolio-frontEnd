import { toast } from "react-hot-toast";

const notify = (promise, successMessage) => {
  toast.promise(promise, {
    loading: "Loading",
    success: (data) => successMessage,
    error: (err) => `${err.response.data.message}`,
  });
};

export { notify };
