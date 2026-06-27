import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            text-white
            text-2xl
            ${color}
          `}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
};

export default StatCard;