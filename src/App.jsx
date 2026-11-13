import { useState } from "react";
import { api } from "./lib/api.js";
import "./styles.css";

export default function App() {
  const [records, setRecords] = useState([]);
  const [section, setSection] = useState("Dashboard");

  async function load(resource) {
    setSection(resource);
    setRecords(await api.list(resource));
  }

  const handleExportExpenses = async () => {
    try {
      const expenses = await api.list("expenses");
      if (!expenses || expenses.length === 0) {
        alert("No expenses to export.");
        return;
      }

      const headers = Object.keys(expenses[0]);
      const csvRows = [
        headers.map(header => JSON.stringify(header)).join(','), // CSV header row, stringify to handle special characters
        ...expenses.map(row =>
          headers.map(fieldName =>
            JSON.stringify(row[fieldName] !== undefined && row[fieldName] !== null ? row[fieldName] : '') // Handle undefined/null values, stringify fields
          ).join(',')
        )
      ];

      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'expenses.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href); // Clean up the object URL
    } catch (error) {
      console.error("Failed to export expenses:", error);
      alert("Failed to export expenses. Check console for details.");
    }
  };

  return (
    <div className="shell">
      <aside>
        <h1>ExpenseFlow</h1>
        <button onClick={() => { setSection("Dashboard"); setRecords([]); }}>Dashboard</button>
        <button onClick={() => load("transactions")}>Transactions</button>
        <button onClick={() => load("expenses")}>Expenses</button>
        {section === "expenses" && (
          <button onClick={handleExportExpenses} style={{ marginTop: '10px' }}>
            Export Expenses to CSV
          </button>
        )}
        <button onClick={() => load("users")}>Users</button>
      </aside>
      <main>
        <span>Generated application</span>
        <h2>{section}</h2>
        <p>ExpenseFlow</p>
        <pre>{JSON.stringify(records, null, 2)}</pre>
      </main>
    </div>
  );
}