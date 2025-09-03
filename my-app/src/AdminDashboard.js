import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([
    { id: 1, title: "Book A", author: "Author A", category: "Fiction", year: 2020, stock: 5, borrowed: true, overdue: false },
    { id: 2, title: "Book B", author: "Author B", category: "Science", year: 2021, stock: 3, borrowed: true, overdue: true },
    { id: 3, title: "Book C", author: "Author C", category: "History", year: 2019, stock: 10, borrowed: false, overdue: false },
  ]);
  const [bookInput, setBookInput] = useState({ title: "", author: "", category: "", year: "", stock: "" });
  const [editBookId, setEditBookId] = useState(null);

  const [members, setMembers] = useState([
    { id: 1, name: "Member 1", email: "m1@example.com" },
    { id: 2, name: "Member 2", email: "m2@example.com" },
  ]);
  const [memberInput, setMemberInput] = useState({ name: "", email: "" });
  const [editMemberId, setEditMemberId] = useState(null);

  const handleLogout = () => navigate("/");

  const totalBooks = books.length;
  const borrowedBooks = books.filter((b) => b.borrowed).length;
  const overdueBooks = books.filter((b) => b.overdue).length;
  const totalMembers = members.length;

  const addOrUpdateBook = () => {
    if (editBookId) {
      setBooks(
        books.map((b) =>
          b.id === editBookId ? { ...b, ...bookInput, id: editBookId } : b
        )
      );
      setEditBookId(null);
    } else {
      setBooks([...books, { ...bookInput, id: Date.now(), borrowed: false, overdue: false }]);
    }
    setBookInput({ title: "", author: "", category: "", year: "", stock: "" });
  };

  const deleteBook = (id) => setBooks(books.filter((b) => b.id !== id));
  const editBook = (book) => { setBookInput(book); setEditBookId(book.id); };

  const addOrUpdateMember = () => {
    if (editMemberId) {
      setMembers(
        members.map((m) =>
          m.id === editMemberId ? { ...m, ...memberInput, id: editMemberId } : m
        )
      );
      setEditMemberId(null);
    } else {
      setMembers([...members, { ...memberInput, id: Date.now() }]);
    }
    setMemberInput({ name: "", email: "" });
  };

  const deleteMember = (id) => setMembers(members.filter((m) => m.id !== id));
  const editMember = (member) => { setMemberInput(member); setEditMemberId(member.id); };

  return (
    <div className="dashboard-container">
      {/* ===== Header ===== */}
      <header className="dashboard-header">
        <h1>📊 Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      {/* ===== Stats ===== */}
      <div className="stats-card">
        <h2>Dashboard Status</h2>
        <p>Total Books: {totalBooks}</p>
        <p>Borrowed Books: {borrowedBooks}</p>
        <p>Overdue Books: {overdueBooks}</p>
        <p>Total Members: {totalMembers}</p>
      </div>

      {/* ===== Manage Books ===== */}
      <section>
        <h2>📚 Manage Books</h2>
        <div className="form-row">
          <input placeholder="Title" value={bookInput.title} onChange={(e) => setBookInput({ ...bookInput, title: e.target.value })} />
          <input placeholder="Author" value={bookInput.author} onChange={(e) => setBookInput({ ...bookInput, author: e.target.value })} />
          <input placeholder="Category" value={bookInput.category} onChange={(e) => setBookInput({ ...bookInput, category: e.target.value })} />
          <input placeholder="Year" value={bookInput.year} onChange={(e) => setBookInput({ ...bookInput, year: e.target.value })} />
          <input placeholder="Stock" value={bookInput.stock} onChange={(e) => setBookInput({ ...bookInput, stock: e.target.value })} />
          <button className="primary-btn" onClick={addOrUpdateBook}>{editBookId ? "Update" : "Add"} Book</button>
        </div>
        <ul className="list">
          {books.map((b) => (
            <li key={b.id} className="list-item">
              <span>{b.title} - {b.author} ({b.category}, {b.year}) [Stock: {b.stock}]</span>
              <div>
                <button className="edit-btn" onClick={() => editBook(b)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteBook(b.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== Manage Members ===== */}
      <section>
        <h2>👥 Manage Members</h2>
        <div className="form-row">
          <input placeholder="Name" value={memberInput.name} onChange={(e) => setMemberInput({ ...memberInput, name: e.target.value })} />
          <input placeholder="Email" value={memberInput.email} onChange={(e) => setMemberInput({ ...memberInput, email: e.target.value })} />
          <button className="primary-btn" onClick={addOrUpdateMember}>{editMemberId ? "Update" : "Add"} Member</button>
        </div>
        <ul className="list">
          {members.map((m) => (
            <li key={m.id} className="list-item">
              <span>{m.name} ({m.email})</span>
              <div>
                <button className="edit-btn" onClick={() => editMember(m)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteMember(m.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
