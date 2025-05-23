import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

export default function ProjectBoq() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [rates, setRates] = useState({});
  const [overrides, setOverrides] = useState({});

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

  function handleRatesFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws, { defval: '' });
      const map = {};
      json.forEach((r) => {
        if (r.Code) map[r.Code] = parseFloat(r.UnitRate);
      });
      setRates(map);
      toast.success('Rates loaded');
    };
    reader.readAsBinaryString(file);
  }

  function getRate(code, idx) {
    if (overrides[idx] !== undefined) return overrides[idx];
    return rates[code] ?? '';
  }

  function handleRateChange(idx, val) {
    setOverrides((o) => ({ ...o, [idx]: parseFloat(val) || '' }));
  }

  function lineTotal(row, idx) {
    const qty = parseFloat(row.Qty || row.Quantity || 0);
    const rate = parseFloat(getRate(row.Code, idx) || 0);
    return qty * rate;
  }

  const grandTotal = rows.reduce((sum, r, i) => sum + lineTotal(r, i), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-brand-dark">BoQ – {id}</h1>
        <Link to="/" className="text-brand-accent underline">
          ← Back
        </Link>
      </div>

      <div className="space-y-2">
        <div>
          <label className="mr-2 text-sm font-medium">Load BoQ:</label>
          <input type="file" accept=".xls,.xlsx,.csv" onChange={handleFile} />
        </div>
        <div>
          <label className="mr-2 text-sm font-medium">Load Rates:</label>
          <input type="file" accept=".xls,.xlsx,.csv" onChange={handleRatesFile} />
        </div>
      </div>

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
                <th className="px-2 py-1 whitespace-nowrap text-left border-r">Unit Rate</th>
                <th className="px-2 py-1 whitespace-nowrap text-left border-r">Total</th>
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
                  <td className="px-2 py-1 whitespace-nowrap border-r">
                    <input
                      type="number"
                      className="w-20 border rounded px-1"
                      value={getRate(r.Code, i)}
                      onChange={(e) => handleRateChange(i, e.target.value)}
                    />
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap border-r text-right">
                    {lineTotal(r, i).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {rows.length > 0 && (
        <p className="text-right font-semibold">Grand Total: {grandTotal.toFixed(2)}</p>
      )}
    </div>
  );
}