import React from "react";
import NotificationCard from "./NotificationCard";

export default function Notifications() {
  const data = [
    {
      title: "New Course Launched!",
      message:
        "Humne ek naya Python Full Stack course launch kiya hai. Enrollment open hai!",
      img: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "UI/UX Design Update",
      message:
        "Design course ke liye naye modules add kiye gaye hain. Check them now!",
      img: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Latest Notifications
      </h1>

      <div className="flex flex-col gap-6">
        {data.map((item, i) => (
          <NotificationCard
            key={i}
            title={item.title}
            message={item.message}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
}
