import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProjectDrawer({ open, onClose, project }) {
  const navigate = useNavigate();
  if (!project) return null;

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onClose}>
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <div className="inline-block w-full max-w-lg p-8 my-8 overflow-y-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                {project.id} – {project.client}
              </Dialog.Title>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Type:</strong> {project.type}
                </p>
                <p>
                  <strong>Due:</strong> {project.due}
                </p>
                <p>
                  <strong>Status:</strong> {project.status}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  to={`/projects/${project.id}/documents`}
                  className="px-4 py-2 bg-brand-accent text-white rounded hover:opacity-90"
                  onClick={() => navigate(`/projects/${project.id}/documents`)}
                >
                  Documents
                </Link>
                <Link
                  to={`/projects/${project.id}/boq`}
                  className="px-4 py-2 bg-brand-dark text-white rounded hover:opacity-90"
                  onClick={() => navigate(`/projects/${project.id}/boq`)}
                >
                  BoQ
                </Link>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}