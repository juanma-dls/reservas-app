import { useEffect, useState } from "react";
import { getUsers } from "@/services/users";
import type { User } from "@/types/user";
import { DataTable } from "@/components/ui/data-table/data-table";
import { userColumns } from "./components/user-columns";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className="p-8 **bg-white min-h-screen**">
      <h1 className="scroll-m-20 text-left **mb-6** text-4xl font-extrabold tracking-tight text-balance"> {/* Más margen inferior */}
        Usuarios
      </h1>
      <DataTable columns={userColumns(navigate)} data={users} />
    </div>
  );
};

export default UsersPage;
