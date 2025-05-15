import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

export default function ProjectBoq() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws, { defval: '' });
      setRows(json);
      toast.success('BoQ loaded');
    };
    reader.readAsBinaryString(file);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-brand-dark">BoQ – {id}</h1>
        <Link to="/" className="text-brand-accent underline">
          ← Back
        </Link>
      </div>

      <input type="file" accept=".xls,.xlsx,.csv" onChange={handleFile} />

      {rows.length > 0 && (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(rows[0]).map((h) => (
                  <th key={h} className="px-2 py-1 whitespace-nowrap text-left border-r">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t">
                  {Object.values(r).map((v, j) => (
                    <td key={j} className="px-2 py-1 whitespace-nowrap border-r">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}