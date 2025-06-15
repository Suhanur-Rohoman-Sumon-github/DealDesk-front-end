"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Admin = {
  id: string;
  name: string;
  email: string;
  image: string;
  isActive: boolean;
  cryptoWallets: {
    BTC: string;
    LTC: string;
    TRC20: string;
  };
};

const AdminPage = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [wallets, setWallets] = useState({
    BTC: "",
    LTC: "",
    TRC20: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      const data: Admin[] = [
        {
          id: "1",
          name: "Tanmoy Parvez",
          email: "tanmoy@example.com",
          image: "https://i.pravatar.cc/150?img=1",
          isActive: true,
          cryptoWallets: {
            BTC: "1BtJ6AxMExuryje93vwcwpprq1J578xGS3",
            LTC: "LTaDSKuFfb1miHB8GVAmzAjMsgGtdfbpDW",
            TRC20: "TGhhaFQNZJochD12v3s6i36R89PcfkkqmU",
          },
        },
        {
          id: "2",
          name: "Alex Green",
          email: "alex@example.com",
          image: "https://i.pravatar.cc/150?img=2",
          isActive: false,
          cryptoWallets: {
            BTC: "",
            LTC: "",
            TRC20: "",
          },
        },
      ];
      setAdmins(data);
    };
    fetchAdmins();
  }, []);

  const toggleActive = (id: string) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id ? { ...admin, isActive: !admin.isActive } : admin
      )
    );
  };

  const openModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setWallets(admin.cryptoWallets);
    setShowModal(true);
  };

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWallets((prev) => ({ ...prev, [name]: value }));
  };

  const saveWallets = () => {
    if (selectedAdmin) {
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === selectedAdmin.id
            ? { ...admin, cryptoWallets: wallets }
            : admin
        )
      );
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="grid gap-6">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 w-[500px]"
          >
            <div className="relative">
              <Image
                height={64}
                width={64}
                loading="lazy"
                src={admin.image}
                alt={admin.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {admin.isActive && (
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{admin.name}</h2>
              <p className="text-sm text-gray-500">{admin.email}</p>
              <div className="text-xs text-gray-600 mt-1">
                BTC: {admin.cryptoWallets.BTC || "N/A"} <br />
                LTC: {admin.cryptoWallets.LTC || "N/A"} <br />
                TRC20: {admin.cryptoWallets.TRC20 || "N/A"}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => toggleActive(admin.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  admin.isActive
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-green-100 text-green-600 hover:bg-green-200"
                }`}
              >
                {admin.isActive ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => openModal(admin)}
                className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
            <h2 className="text-xl font-semibold mb-4">
              Update Wallets - {selectedAdmin.name}
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="BTC"
                value={wallets.BTC}
                onChange={handleWalletChange}
                placeholder="BTC Address"
                className="border rounded p-2"
              />
              <input
                type="text"
                name="LTC"
                value={wallets.LTC}
                onChange={handleWalletChange}
                placeholder="LTC Address"
                className="border rounded p-2"
              />
              <input
                type="text"
                name="TRC20"
                value={wallets.TRC20}
                onChange={handleWalletChange}
                placeholder="TRC20 Address"
                className="border rounded p-2"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveWallets}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
