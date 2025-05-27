/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AlarmClock } from "lucide-react";
import { useState } from "react";

export default function AccountStatement({
  jabedaStatements,
  startingBalance,
}: {
  jabedaStatements: any;
  startingBalance: number;
}) {
  console.log("jabedaStatements", jabedaStatements);
  const [form, setForm] = useState({
    description: "",
    type: "Debit",
    amount: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount || isNaN(Number(form.amount))) return;

    setForm({ description: "", type: "Debit", amount: "" });
  };

  let currentBalance = startingBalance;
  let totalDebit = 0;
  let totalCredit = 0;

  return (
    <div className="grid gap-6 grid-cols-1 mt-4">
      <div className="border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlarmClock className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Jabeda (Account Statement)</h3>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold">Todays Starting Balance:</p>
          <p className="text-xl font-bold text-blue-600">
            ${startingBalance.toFixed(2)}
          </p>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left border rounded mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Date/Time</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border text-green-600">Credit ($)</th>
                <th className="px-4 py-2 border text-red-600">Debit ($)</th>

                <th className="px-4 py-2 border">Balance ($)</th>
              </tr>
            </thead>
            <tbody>
              {jabedaStatements.map((txn: any, index: number) => {
                if (txn.type === "Debit") {
                  currentBalance -= txn.amount;
                  console.log("currentBalance", currentBalance);
                  console.log("txn.amount", txn.amount);
                  totalDebit += txn.amount;
                } else {
                  currentBalance += txn.amount;
                  totalCredit += txn.amount;
                }

                return (
                  <tr
                    key={index}
                    className={
                      txn.type === "Debit" ? "bg-red-50" : "bg-green-50"
                    }
                  >
                    <td className="px-4 py-2 border font-medium">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border">{txn.date}</td>
                    <td className="px-4 py-2 border">{txn.description}</td>
                    <td className="px-4 py-2 border text-green-600">
                      {txn.type === "Credit" ? txn.amount.toFixed(2) : "-"}
                    </td>
                    <td className="px-4 py-2 border text-red-600">
                      {txn.type === "Debit" ? txn.amount.toFixed(2) : "-"}
                    </td>

                    <td className="px-4 py-2 border font-semibold">
                      {currentBalance.toFixed(2)}
                    </td>
                  </tr>
                );
              })}

              <tr className="bg-gray-200 font-semibold">
                <td colSpan={3} className="px-4 py-2 border text-right">
                  Total
                </td>
                <td className="px-4 py-2 border text-green-600">
                  {totalCredit.toFixed(2)}
                </td>
                <td className="px-4 py-2 border text-red-600">
                  {totalDebit.toFixed(2)}
                </td>

                <td className="px-4 py-2 border">
                  {(totalCredit - totalDebit).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Form to add transaction */}
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-3">
            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="border rounded px-3 py-2"
            >
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>
            <button
              type="submit"
              className="sm:col-span-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
