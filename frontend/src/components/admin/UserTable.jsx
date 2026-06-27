import { FaTrash } from "../../utils/icons";

const UserTable = ({
  users,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow">

      <table className="w-full">

        <thead className="bg-green-600 text-white">

          <tr>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Role
            </th>

            <th className="p-4 text-left">
              Verified
            </th>

            <th className="p-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user._id}
              className="border-b"
            >

              <td className="p-4">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4 capitalize">
                {user.role}
              </td>

              <td className="p-4">

                {user.isVerified
                  ? "Yes"
                  : "No"}

              </td>

              <td className="p-4 text-center">

                <button
                  onClick={() =>
                    onDelete(user._id)
                  }
                  className="text-red-500"
                >
                  <FaTrash />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default UserTable;