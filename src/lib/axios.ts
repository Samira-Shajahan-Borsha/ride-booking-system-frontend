import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // console.log("Axios Request Config", config);
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

interface pendingQueueItem {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
}

let isRefreshing = false;

let pendingQueueItem: pendingQueueItem[] = [];

const processQueue = (error: unknown) => {
    pendingQueueItem.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(null);
        }
    });

    pendingQueueItem = [];
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // console.log("Request Failed", error.response);

        const originalRequest = error.config as AxiosRequestConfig & {
            _retry: boolean;
        };

        // console.log(originalRequest);

        if (
            error.response.status === 500 &&
            error.response.data.message === "jwt expired" &&
            !originalRequest._retry
        ) {
            console.log("Your token is expired");

            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueueItem.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch((error) => Promise.reject(error));
            }

            isRefreshing = true;

            try {
                const response = await axiosInstance.post("/auth/refresh-token");
                console.log(response, "New Token");

                processQueue(null);

                return axiosInstance(originalRequest);
            } catch (error) {
                processQueue(error);
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        // For everything
        return Promise.reject(error);
    }
);
