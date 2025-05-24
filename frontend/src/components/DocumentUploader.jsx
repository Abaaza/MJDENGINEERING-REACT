import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

export default function DocumentUploader() {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: (accepted) => {
      if (!accepted.length) return;
      setFiles((prev) => [...accepted, ...prev]);
      toast.success(`Uploaded ${accepted.length} file${accepted.length > 1 ? 's' : ''}`);
    },
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-8 text-center cursor-pointer ${
          isDragActive ? 'bg-brand-light' : ''
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-gray-600 mb-4">
          Drag & drop files here, or click the button to select
        </p>
        <button
          type="button"
          className="px-4 py-2 bg-brand-accent text-white rounded"
          onClick={open}
        >
          Browse files
        </button>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm">
          {files.map((f, i) => (
            <li key={i} className="flex justify-between bg-gray-50 p-2 rounded">
              <span>{f.name}</span>
              <span className="text-gray-400">
                {(f.size / 1024).toFixed(1)}&nbsp;KB
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
