import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Video, Plus, Trash2, Edit, Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

export function AdminVideos() {
  const { videos, addVideo, deleteVideo } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    thumbnailUrl: '',
    isPremium: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalUrl = formData.url;

    if (uploadType === 'file' && videoFile) {
      setIsUploading(true);
      
      try {
        const storageRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, videoFile);

        finalUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(Math.round(progress));
            },
            (error) => {
              console.error("Upload failed:", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      } catch (error: any) {
        console.error("Upload failed:", error);
        if (error.code === 'storage/unauthorized') {
          alert('Erro de permissão: Você não tem permissão para fazer upload. Verifique as regras de segurança do Firebase Storage no console do Firebase.');
        } else {
          alert(`Erro ao fazer upload do vídeo: ${error.message || 'Tente novamente.'}`);
        }
        setIsUploading(false);
        return;
      }
      
      setIsUploading(false);
      setUploadProgress(0);
    }

    addVideo({ ...formData, url: finalUrl });
    setIsAdding(false);
    setFormData({ title: '', description: '', url: '', thumbnailUrl: '', isPremium: false });
    setVideoFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400 flex items-center gap-3">
          <Video className="w-8 h-8 text-blue-500" />
          Gerenciar Vídeos
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 tv-focusable"
        >
          <Plus className="w-4 h-4" />
          Novo Vídeo
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Título</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Fonte do Vídeo</label>
              <div className="flex bg-slate-950 border border-slate-700 rounded-xl p-1 mb-3">
                <button
                  type="button"
                  onClick={() => setUploadType('url')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all tv-focusable ${uploadType === 'url' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <LinkIcon className="w-4 h-4" />
                  URL Externa
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType('file')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all tv-focusable ${uploadType === 'file' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Upload className="w-4 h-4" />
                  Upload de Arquivo
                </button>
              </div>

              {uploadType === 'url' ? (
                <input required type="url" placeholder="https://..." value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" />
              ) : (
                <div className="relative">
                  <input 
                    required={uploadType === 'file' && !videoFile} 
                    type="file" 
                    accept="video/mp4,video/webm" 
                    onChange={handleFileChange} 
                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-600/30 transition-all tv-focusable" 
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10 border border-slate-700">
                      <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-medium">Enviando para a nuvem... {uploadProgress}%</span>
                      </div>
                      <div className="w-3/4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">URL da Thumbnail (Imagem)</label>
              <input required type="url" value={formData.thumbnailUrl} onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" />
            </div>
            <div className="flex items-center mt-7">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" checked={formData.isPremium} onChange={e => setFormData({...formData, isPremium: e.target.checked})} className="peer sr-only tv-focusable" />
                  <div className="w-10 h-6 bg-slate-700 rounded-full peer-checked:bg-amber-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-amber-400 transition-colors">Conteúdo Premium</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Descrição</label>
              <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-5 border-t border-slate-800/50 mt-6">
            <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors tv-focusable">Cancelar</button>
            <button type="submit" disabled={isUploading} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 tv-focusable disabled:opacity-50 disabled:cursor-not-allowed">
              {isUploading ? 'Enviando...' : 'Salvar Vídeo'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        <table className="min-w-full divide-y divide-slate-800/50">
          <thead className="bg-slate-800/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Vídeo</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {videos.map((video) => (
              <tr key={video.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-20 flex-shrink-0 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                      <img className="h-full w-full object-cover" src={video.thumbnailUrl} alt="" referrerPolicy="no-referrer" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-slate-100">{video.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${video.isPremium ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                    {video.isPremium ? 'Premium' : 'Gratuito'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => deleteVideo(video.id)} className="text-red-400 hover:text-red-300 ml-4 p-2 hover:bg-red-400/10 rounded-lg transition-colors tv-focusable">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
