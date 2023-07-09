import { create } from 'zustand';
interface UploadModalProps {
   isUploading: string;
   showUploadModal: boolean;
   setShowUploadModal: (value: boolean) => void;
   setUploading: (value: string) => void;
}
const useUploadModal = create<UploadModalProps>((set) => ({
   isUploading: 'updated',

   showUploadModal: false,
   setShowUploadModal: (value: boolean) =>
      set({
         showUploadModal: value,
      }),
   setUploading: (value: string) => set({ isUploading: value }),
}));

export default useUploadModal;
