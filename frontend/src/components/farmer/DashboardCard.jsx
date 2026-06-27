import { motion } from "framer-motion";

const DashboardCard = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`
            w-16
            h-16
            rounded-xl
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

export default DashboardCard;