import LoadingSpinner from "../../components/ui/LoadingSpinner";

import UserTable from "../../components/admin/UserTable";

import useUsers from "../../hooks/useUsers";

const Users = () => {
  const {
    loading,
    users,
    removeUser,
  } = useUsers();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Users..."
      />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          Users Management
        </h1>

        <UserTable
          users={users}
          onDelete={removeUser}
        />

      </div>

    </section>
  );
};

export default Users;