import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(form);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded space-y-4 w-80"
      >
        <h1 className="text-xl font-semibold text-center">Register</h1>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Name"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full bg-brand-dark text-white py-2 rounded"
        >
          Register
        </button>
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link className="text-brand-dark" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
