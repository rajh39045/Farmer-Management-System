import { motion } from "framer-motion";

import GlassCard from "../../ui/GlassCard";
import Badge from "../../ui/Badge";
import SectionHeading from "../../ui/SectionHeading";

import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBoxOpen,
  FaStar,
  FaCalendarAlt,
  FaCheckCircle,
} from "../../../utils/icons";

import { fadeUp } from "../../../animations/framerVariants";

const FarmerInfo = ({ farmer }) => {
  if (!farmer) return null;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-16"
    >
      <SectionHeading
        title="Meet the"
        highlight="Farmer"
        subtitle="Know the person growing your food."
        center={false}
      />

      <GlassCard>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Avatar */}

          <div className="flex justify-center">

            <img
              src={
                farmer.avatar ||
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43?auto=format&fit=crop&w=600&q=80"
              }
              alt={farmer.name}
              className="
                w-40
                h-40
                rounded-full
                object-cover
                border-4
                border-green-100
              "
            />

          </div>

          {/* Information */}

          <div className="flex-1 space-y-5">

            <div className="flex flex-wrap items-center gap-4">

              <h2 className="text-3xl font-bold">
                {farmer.name}
              </h2>

              {farmer.isVerified && (
                <Badge variant="success">
                  <FaCheckCircle className="mr-2" />
                  Verified Farmer
                </Badge>
              )}

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="flex items-center gap-3">

                <FaStar className="text-yellow-400" />

                <span>
                  {farmer.rating || 0} Rating
                </span>

              </div>

              <div className="flex items-center gap-3">

                <FaMapMarkerAlt className="text-green-600" />

                <span>
                  {farmer.location || "Not Available"}
                </span>

              </div>

              {farmer.phone && (

                <div className="flex items-center gap-3">

                  <FaPhone className="text-blue-500" />

                  <span>{farmer.phone}</span>

                </div>

              )}

              {farmer.email && (

                <div className="flex items-center gap-3">

                  <FaEnvelope className="text-red-500" />

                  <span>{farmer.email}</span>

                </div>

              )}

              <div className="flex items-center gap-3">

                <FaBoxOpen className="text-orange-500" />

                <span>
                  {farmer.totalProducts || 0} Products
                </span>

              </div>

              <div className="flex items-center gap-3">

                <FaCalendarAlt className="text-purple-500" />

                <span>
                  Member Since{" "}
                  {farmer.createdAt
                    ? new Date(
                        farmer.createdAt
                      ).getFullYear()
                    : "-"}
                </span>

              </div>

            </div>

            {farmer.bio && (

              <div>

                <h3 className="font-semibold mb-2">
                  About Farmer
                </h3>

                <p className="text-gray-600 leading-8">
                  {farmer.bio}
                </p>

              </div>

            )}

          </div>

        </div>

      </GlassCard>

    </motion.section>
  );
};

export default FarmerInfo;