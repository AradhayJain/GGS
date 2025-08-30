import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingClothes = () => {
  const [items, setItems] = useState([]);

  const clothingImages = [
    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200'
  ];

  useEffect(() => {
    const generateItems = () => {
      const newItems = [];
      for (let i = 0; i < 8; i++) {
        newItems.push({
          id: i,
          src: clothingImages[Math.floor(Math.random() * clothingImages.length)],
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: 0.3 + Math.random() * 0.4,
          duration: 20 + Math.random() * 30
        });
      }
      setItems(newItems);
    };

    generateItems();
    window.addEventListener('resize', generateItems);
    return () => window.removeEventListener('resize', generateItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute opacity-10"
          initial={{
            x: item.x,
            y: item.y,
            rotate: item.rotation,
            scale: item.scale
          }}
          animate={{
            x: [item.x, item.x + 100, item.x - 50, item.x],
            y: [item.y, item.y - 200, item.y + 100, item.y],
            rotate: [item.rotation, item.rotation + 180, item.rotation + 360],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <img
            src={item.src}
            alt="Floating clothing"
            className="w-16 h-16 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingClothes;