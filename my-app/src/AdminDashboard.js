import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Simulated data
  const [books, setBooks] = useState([
    { title: "Book A", borrowed: true, overdue: false },
    { title: "Book B", borrowed: true, overdue: true },
    { title: "Book C", borrowed: false, overdue: false },
  ]);

  const [members, setMembers] = useState([
    { name: "Member 1" },
    { name: "Member 2" },
  ]);

  const handleLogout = () => {
    navigate("/");
  };

  const totalBooks = books.length;
  const borrowedBooks = books.filter((b) => b.borrowed).length;
  const overdueBooks = books.filter((b) => b.overdue).length;
  const totalMembers = members.length;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Admin Dashboard</h1>
      <button onClick={handleLogout} style={{ float: "right" }}>Logout</button>

      <div style={{ marginTop: "50px" }}>
        <p>Total Books: {totalBooks}</p>
        <p>Borrowed Books: {borrowedBooks}</p>
        <p>Overdue Books: {overdueBooks}</p>
        <p>Total Members: {totalMembers}</p>
      </div>
    </div>
  );
}
