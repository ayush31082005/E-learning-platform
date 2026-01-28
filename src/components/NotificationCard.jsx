import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function NotificationCard({ title, message, img }) {
  return (
    <Card
      className="
      flex flex-col md:flex-row 
      items-center justify-between
      border border-gray-300 shadow-lg
      rounded-2xl p-4 mb-6
      hover:shadow-2xl hover:scale-[1.01]
      transition-all duration-500 ease-out bg-white
      "
    >
      {/* LEFT CONTENT */}
      <CardContent className="flex-1 text-center md:text-left">
        <Typography variant="h5" className="font-bold text-gray-800 mb-1">
          {title}
        </Typography>

        <Typography
          variant="body1"
          className="text-gray-600 leading-relaxed text-sm md:text-base"
        >
          {message}
        </Typography>
      </CardContent>

      {/* RIGHT IMAGE (FIXED SMALL SIZE) */}
      <Box
        className="
        w-40 h-28 ml-0 md:ml-6 
        rounded-xl overflow-hidden border border-gray-400
        hover:scale-105 hover:shadow-xl 
        transition-all duration-500
        "
      >
        <img src={img} alt="notification" className="w-full h-full object-cover" />
      </Box>
    </Card>
  );
}
