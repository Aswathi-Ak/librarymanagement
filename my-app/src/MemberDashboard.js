import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberDashboard.css"; // Import CSS

export default function MemberDashboard() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([
    { id: 1, title: "Book A", author: "Author A", category: "Fiction", stock: 3 },
    { id: 2, title: "Book B", author: "Author B", category: "Science", stock: 0 },
    { id: 3, title: "Book C", author: "Author C", category: "Fiction", stock: 5 }
  ]);

  const [members] = useState([{ id: 101, name: "Member" }]);
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailable, setFilterAvailable] = useState(false);

  const currentMember = members[0];

  const handleLogout = () => navigate("/");

  const borrowBook = (bookId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId && b.stock > 0 ? { ...b, stock: b.stock - 1 } : b
      )
    );

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 14);

    setBorrowRecords((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        memberId: currentMember.id,
        bookId,
        borrowedDate: today.toISOString().split("T")[0],
        dueDate: due.toISOString().split("T")[0],
        returnedDate: null,
        status: "Borrowed"
      }
    ]);
  };

  const returnBook = (recordId) => {
    setBorrowRecords((prev) =>
      prev.map((r) =>
        r.id === recordId
          ? { ...r, returnedDate: new Date().toISOString().split("T")[0], status: "Returned" }
          : r
      )
    );

    const record = borrowRecords.find((r) => r.id === recordId);
    if (record) {
      setBooks((prev) =>
        prev.map((b) => (b.id === record.bookId ? { ...b, stock: b.stock + 1 } : b))
      );
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAvailability = filterAvailable ? book.stock > 0 : true;

    return matchesSearch && matchesAvailability;
  });

  return (
    <div className="member-dashboard">
      {/* Header */}
      <header className="member-header">
        <h1>📚 Member Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <p className="welcome-msg">Welcome, <strong>{currentMember.name}</strong> 👋</p>

      {/* Borrowed Books */}
      <section>
        <h2>My Borrowed Books</h2>
        {borrowRecords.filter(r => r.memberId === currentMember.id && r.status === "Borrowed").length === 0 ? (
          <p className="empty-msg">No borrowed books yet.</p>
        ) : (
          <ul className="list">
            {borrowRecords.filter(r => r.memberId === currentMember.id && r.status === "Borrowed")
              .map(record => {
                const book = books.find(b => b.id === record.bookId);
                const today = new Date();
                const dueDate = new Date(record.dueDate);
                const isOverdue = today > dueDate;

                return (
                  <li
                    key={record.id}
                    className={`list-item ${isOverdue ? "overdue" : "borrowed"}`}
                  >
                    <div>
                      <p className="book-title">{book?.title}</p>
                      <p className="book-due">Due Date: <span>{record.dueDate}</span></p>
                    </div>
                    <button className="return-btn" onClick={() => returnBook(record.id)}>Return</button>
                  </li>
                )
              })}
          </ul>
        )}
      </section>

      {/* Browse Books */}
      <section>
        <h2>Browse Books</h2>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={filterAvailable}
              onChange={() => setFilterAvailable(!filterAvailable)}
            />
            Show only available
          </label>
        </div>

        <ul className="list">
          {filteredBooks.map((book) => (
            <li key={book.id} className={`list-item ${book.stock === 0 ? "out-of-stock" : "available"}`}>
              <div>
                <p className="book-title">{book.title}</p>
                <p className="book-info">Author: {book.author} | Category: {book.category} | Stock: {book.stock}</p>
              </div>
              <button className="borrow-btn" onClick={() => borrowBook(book.id)} disabled={book.stock === 0}>Borrow</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
