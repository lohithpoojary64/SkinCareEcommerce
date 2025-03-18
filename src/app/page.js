'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function main() {
  const router = useRouter();


  useEffect(() => {
    setTimeout(() => {
      router.push('/home');
    }, 3000);
  }, [])




  return (
    <div className="min-h-screen h-screen w-full">
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-4 h-4 bg-blue-500 rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
