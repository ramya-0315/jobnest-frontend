import React from 'react';
import { Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import BuildIcon from '@mui/icons-material/Build';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { motion } from 'framer-motion';

const CandidatesSection = () => {
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
        <ConstructionIcon style={{ fontSize: 100, color: '#3b0764' }} />
      </motion.div>

      {/* Heading */}
      <Typography
        variant="h4"
        className="mt-6 font-bold text-[#3b0764] text-center"
      >
        Page Under Construction
      </Typography>

      {/* Sub Content */}
      <Typography
        variant="body1"
        className="mt-4 text-gray-600 text-center max-w-2xl"
      >
        We are working hard to bring you this feature.  
        Our team is building a better experience for you to search and find the perfect candidates!
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
        Thank you for your patience and support. 🚀  
        Stay tuned, exciting updates are on the way!
      </Typography>
    </motion.div>
  );
};

export default CandidatesSection;
