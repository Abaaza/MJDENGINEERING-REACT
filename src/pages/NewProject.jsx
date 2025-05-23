import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function NewProject() {
  const [form, setForm] = useState({ id: '', client: '', type: '', due: '' });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO – replace with real API call
    console.log('Create project', form);
    toast.success('Project created');
    navigate('/');
  }

  return (
    <div className="space-y-6 max-w-md">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-brand-dark">New Project</h1>
        <Link to="/" className="text-brand-accent underline">
          ← Back
        </Link>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="id">Code</label>
          <input
            id="id"
            name="id"
            value={form.id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="client">Client</label>
          <input
            id="client"
            name="client"
            value={form.client}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="type">Type</label>
          <input
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="due">Due Date</label>
          <input
            id="due"
            type="date"
            name="due"
            value={form.due}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-brand-dark text-white rounded hover:opacity-90"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}
