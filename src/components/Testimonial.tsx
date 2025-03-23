
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialProps {
  quote: string;
  author: string;
  avatar: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({ quote, author, avatar }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full bg-white/90 backdrop-blur-sm overflow-hidden border-2 border-purple-100">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <div className="text-5xl text-purple-300 mb-4">"</div>
            <p className="text-gray-700 italic mb-4">{quote}</p>
          </div>
          <div className="flex items-center mt-4">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-purple-200">
              <img src={avatar} alt={author} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-semibold text-purple-800">{author}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
