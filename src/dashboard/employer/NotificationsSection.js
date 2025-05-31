import React from 'react';
import { Box, Typography } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CampaignIcon from '@mui/icons-material/Campaign';
import { motion } from 'framer-motion';

const NotificationsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[70vh] p-8 bg-white rounded-xl shadow"
    >
      {/* Main Icon with Animation */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 0.9, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <NotificationsActiveIcon style={{ fontSize: 100, color: '#3b0764' }} />
      </motion.div>

      {/* Heading */}
      <Typography
        variant="h4"
        className="mt-6 font-bold text-[#3b0764] text-center"
      >
        Notifications Page Under Construction
      </Typography>

      {/* Sub Content */}
      <Typography
        variant="body1"
        className="mt-4 text-gray-600 text-center max-w-2xl"
      >
        Soon you'll receive real-time updates about new applications, interview schedules, 
        and platform alerts — all in one place!
      </Typography>

      {/* Extra Icons */}
      <Box className="flex gap-6 mt-8">
        <NotificationsNoneIcon style={{ fontSize: 50, color: '#6b21a8' }} />
        <CampaignIcon style={{ fontSize: 50, color: '#6b21a8' }} />
      </Box>

      {/* Thank You Message */}
      <Typography
        variant="body2"
        className="mt-6 text-gray-500 text-center"
      >
        Stay tuned! 🚀  
        We are building a smarter notification system for you.
      </Typography>
    </motion.div>
  );
};

export default NotificationsSection;
