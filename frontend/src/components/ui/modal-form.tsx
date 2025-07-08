import { X } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal = ({ onClose, children, title }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={onClose}
        ></div>
        <div className="relative bg-white rounded-lg w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800 px-4">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-200 rounded-lg 
              text-sm p-1.5 ml-auto inline-flex"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="px-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
