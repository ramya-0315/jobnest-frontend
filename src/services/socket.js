import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export const subscribeToNotifications = (callback) => {
  socket.on("notification", (data) => {
    callback(data);
  });
};

export const sendMessage = (message) => {
  socket.emit("send_message", message);
};

export default socket;