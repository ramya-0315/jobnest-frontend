import React from 'react';
import { Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { motion } from 'framer-motion';

const SettingsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[70vh] p-8 bg-white rounded-xl shadow"
    >
      {/* Top Icon */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <SettingsIcon style={{ fontSize: 100, color: '#3b0764' }} />
      </motion.div>

      {/* Heading */}
      <Typography
        variant="h4"
        className="mt-6 font-bold text-[#3b0764] text-center"
      >
        Settings Page Under Construction
      </Typography>

      {/* Sub Content */}
      <Typography
        variant="body1"
        className="mt-4 text-gray-600 text-center max-w-2xl"
      >
        We are fine-tuning your settings management experience.  
        Soon you will be able to update your email, password, and more — quickly and securely!
      </Typography>

      {/* More Icons */}
      <Box className="flex gap-6 mt-8">
        <BuildIcon style={{ fontSize: 50, color: '#6b21a8' }} />
        <EngineeringIcon style={{ fontSize: 50, color: '#6b21a8' }} />
      </Box>

      {/* Thank you message */}
      <Typography
        variant="body2"
        className="mt-6 text-gray-500 text-center"
      >
        Thank you for your patience. 🚀  
        New features are on the way!
      </Typography>
    </motion.div>
  );
};

export default SettingsSection;
