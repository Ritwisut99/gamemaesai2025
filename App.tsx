import React, { useState, useEffect, useRef } from 'react';
import { Upload, CheckCircle, Download, User, Camera, RefreshCcw, Image as ImageIcon, AlertCircle, Trash2, MapPin } from 'lucide-react';
import { UserProfile, UploadedImage, AppState, TOPIC_COUNT, REQUIRED_COUNT } from './types';

// --- Utilities ---

// Resize image to avoid LocalStorage quota limits (max 5MB usually)
const resizeImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600; // Resize to manageable thumbnail size
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

// --- Components ---

const Header = ({ onReset }: { onReset: () => void }) => (
  <header className="bg-red-600 shadow-md sticky top-0 z-50 text-white">
    <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
            <h1 className="text-lg font-bold leading-tight">เกมส์ค้นหา</h1>
            <p className="text-xs text-red-100 font-medium">กาดก้อมสร้างเมืองซอยบ้านเรา</p>
        </div>
      </div>
      <button 
        onClick={onReset}
        className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
      >
        <RefreshCcw className="w-3 h-3" /> เริ่มใหม่
      </button>
    </div>
  </header>
);

const Registration = ({ onStart }: { onStart: (user: UserProfile) => void }) => {
  const [form, setForm] = useState<UserProfile>({ name: '', surname: '', age: '', gender: '' });

  const isValid = form.name && form.surname && form.age && form.gender;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-b from-red-50 to-white">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-red-100">
        <div className="text-center mb-8">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-red-100">
            <User className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-900">ลงทะเบียนร่วมกิจกรรม</h2>
          <p className="text-slate-500 mt-1">เกมส์ค้นหากาดก้อมสร้างเมืองซอยบ้านเรา</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ชื่อ</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                placeholder="ชื่อจริง"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">นามสกุล</label>
              <input
                type="text"
                value={form.surname}
                onChange={(e) => setForm({ ...form, surname: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                placeholder="นามสกุล"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">อายุ</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              placeholder="อายุ (ปี)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">เพศ</label>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition-colors ${form.gender === 'Male' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                <input
                  type="radio"
                  name="gender"
                  className="hidden"
                  checked={form.gender === 'Male'}
                  onChange={() => setForm({ ...form, gender: 'Male' })}
                />
                ชาย
              </label>
              <label className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition-colors ${form.gender === 'Female' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                <input
                  type="radio"
                  name="gender"
                  className="hidden"
                  checked={form.gender === 'Female'}
                  onChange={() => setForm({ ...form, gender: 'Female' })}
                />
                หญิง
              </label>
            </div>
          </div>

          <button
            onClick={() => isValid && onStart(form)}
            disabled={!isValid}
            className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all mt-6 shadow-lg ${isValid ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-red-200 transform hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            เริ่มเล่นเกม
          </button>
        </div>
      </div>
    </div>
  );
};

const GameBoard = ({ user, uploads, onUpload, onDelete, onSubmit }: { 
  user: UserProfile, 
  uploads: Record<number, UploadedImage>, 
  onUpload: (id: number, file: File) => void,
  onDelete: (id: number) => void,
  onSubmit: () => void
}) => {
  const uploadedCount = Object.keys(uploads).length;
  // Progress logic: 10 is 100% (completion), but can go up to 20.
  const progressPercentage = Math.min((uploadedCount / REQUIRED_COUNT) * 100, 100);
  const canSubmit = uploadedCount >= REQUIRED_COUNT;

  return (
    <div className="max-w-5xl mx-auto p-4 pb-28">
      {/* User Info & Progress */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6 border border-red-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-red-600" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-800">{user.name} {user.surname}</h3>
                    <p className="text-sm text-slate-500">อายุ {user.age} ปี • {user.gender === 'Male' ? 'ชาย' : 'หญิง'}</p>
                </div>
            </div>
            
            <div className="w-full md:w-72 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">ความคืบหน้าภารกิจ</span>
                    <span className={`font-bold ${canSubmit ? 'text-green-600' : 'text-red-600'}`}>
                    {uploadedCount} / {REQUIRED_COUNT} {uploadedCount > REQUIRED_COUNT && <span className="text-xs text-slate-400">(สูงสุด 20)</span>}
                    </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div 
                    className={`h-full rounded-full transition-all duration-500 ${canSubmit ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`} 
                    style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <p className="text-xs text-center mt-2 text-slate-400">
                    {canSubmit ? "ภารกิจสำเร็จ! สามารถส่งคำตอบได้ หรือสะสมต่อให้ครบ 20" : `อัพโหลดอีก ${REQUIRED_COUNT - uploadedCount} ภาพ เพื่อผ่านภารกิจ`}
                </p>
            </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-red-900">
          <p className="font-bold mb-1">กติกาการรับรางวัล:</p>
          <ul className="list-disc list-inside space-y-1 opacity-90">
            <li>ภารกิจถ่ายภาพร่วมกับป้ายร้านค้า หรือสแกนภาพ AR</li>
            <li>อัพโหลดรูปภาพให้ครบ <strong>10 ช่อง</strong> เพื่อถือว่าภารกิจสำเร็จ 100%</li>
            <li>สามารถอัพโหลดสะสมได้สูงสุด 20 ช่อง</li>
          </ul>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: TOPIC_COUNT }).map((_, index) => {
          const id = index + 1;
          const hasImage = !!uploads[id];
          
          return (
            <div key={id} className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group ${hasImage ? 'border-red-500 shadow-md' : 'border-dashed border-slate-300 hover:border-red-400 bg-white hover:bg-red-50'}`}>
              
              {!hasImage && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) onUpload(id, e.target.files[0]);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
              )}
              
              {hasImage ? (
                <>
                  <img src={uploads[id].dataUrl} alt={`Slot ${id}`} className="w-full h-full object-cover" />
                  
                  {/* Delete Button */}
                  <button 
                    onClick={() => onDelete(id)}
                    className="absolute top-1.5 right-1.5 bg-black/50 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center z-30 backdrop-blur-sm transition-colors"
                    title="ลบรูปภาพ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">
                    #{id}
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 bg-green-500 text-white rounded-full p-0.5 shadow-sm z-10">
                     <CheckCircle className="w-3 h-3" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-2 text-center pointer-events-none">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                     <Camera className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm">จุดที่ {id}</span>
                  <span className="text-[10px] text-slate-400">แตะเพื่อถ่าย</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="hidden md:block">
                <p className="font-bold text-slate-800">สถานะการส่งคำตอบ</p>
                <p className="text-xs text-slate-500">
                    {canSubmit ? "พร้อมส่งคำตอบแล้ว" : `ต้องอัพโหลดอีก ${REQUIRED_COUNT - uploadedCount} รูป`}
                </p>
            </div>
            <button
                onClick={onSubmit}
                disabled={!canSubmit}
                className={`w-full md:w-auto px-10 py-3 rounded-full font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                canSubmit 
                    ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-red-200 hover:-translate-y-0.5' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
            >
                {canSubmit ? <CheckCircle className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                {canSubmit ? 'ยืนยันส่งคำตอบ' : `สะสมให้ครบ ${REQUIRED_COUNT} จุด`}
            </button>
        </div>
      </div>
    </div>
  );
};

const ResultPage = ({ user, uploads, onReset }: { user: UserProfile, uploads: Record<number, UploadedImage>, onReset: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadImage = () => {
    setIsGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate Grid Dimensions dynamically based on image count
    const uploadsCount = Object.keys(uploads).length;
    // If > 10 images, we use 4 columns. If <= 10, we can use 2 columns for larger images.
    // Actually, for a summary card of 20 images, 4 cols x 5 rows is best.
    // For 10 images, 2 cols x 5 rows works well.
    const cols = uploadsCount > 12 ? 4 : (uploadsCount > 4 ? (uploadsCount <= 8 ? 2 : 3) : 2);
    const rows = Math.ceil(uploadsCount / cols);

    const gap = 20;
    const marginX = 60;
    const headerHeight = 280;
    const footerHeight = 100;
    
    // Dynamic height calculation
    // Assume width is fixed at 1200
    const canvasWidth = 1200;
    const cellWidth = (canvasWidth - (marginX * 2) - (gap * (cols - 1))) / cols;
    // Keep aspect ratio square for cells
    const cellHeight = cellWidth;
    
    const contentHeight = (rows * cellHeight) + ((rows - 1) * gap);
    const canvasHeight = headerHeight + contentHeight + footerHeight + marginX; // + marginX for bottom padding

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvasWidth;
    exportCanvas.height = canvasHeight; 
    const eCtx = exportCanvas.getContext('2d');
    
    if (!eCtx) return;

    // Background
    eCtx.fillStyle = '#fef2f2'; // red-50
    eCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Header Bg
    eCtx.fillStyle = '#dc2626'; // red-600
    eCtx.fillRect(0, 0, exportCanvas.width, 240);
    
    // Decorative circle
    eCtx.beginPath();
    eCtx.arc(exportCanvas.width / 2, 240, 40, 0, Math.PI * 2);
    eCtx.fillStyle = '#dc2626';
    eCtx.fill();

    // Text Styles
    eCtx.fillStyle = '#ffffff';
    eCtx.font = 'bold 56px Sarabun, sans-serif';
    eCtx.textAlign = 'center';
    eCtx.fillText('เกมส์ค้นหา', exportCanvas.width / 2, 100);
    
    eCtx.font = '40px Sarabun, sans-serif';
    eCtx.fillText('กาดก้อมสร้างเมืองซอยบ้านเรา', exportCanvas.width / 2, 160);

    eCtx.font = '32px Sarabun, sans-serif';
    eCtx.fillStyle = '#ffffff';
    eCtx.fillText(`ผู้พิชิตภารกิจ: ${user.name} ${user.surname}`, exportCanvas.width / 2, 220);

    // Grid Logic
    const startX = marginX;
    const startY = headerHeight + 20;

    const sortedIds = Object.keys(uploads).map(Number).sort((a, b) => a - b);

    const promises = sortedIds.map((id, index) => {
        return new Promise<void>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const col = index % cols;
                const row = Math.floor(index / cols);
                const x = startX + col * (cellWidth + gap);
                const y = startY + row * (cellHeight + gap);

                const scale = Math.max(cellWidth / img.width, cellHeight / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                
                eCtx.save();
                eCtx.beginPath();
                eCtx.roundRect(x, y, cellWidth, cellHeight, 12);
                eCtx.clip();
                eCtx.drawImage(img, x - (w - cellWidth) / 2, y - (h - cellHeight) / 2, w, h);
                eCtx.restore();

                // Draw ID Badge
                eCtx.fillStyle = '#dc2626'; // red-600
                eCtx.beginPath();
                eCtx.roundRect(x + 10, y + 10, 40, 32, 6);
                eCtx.fill();
                eCtx.fillStyle = '#ffffff';
                eCtx.font = 'bold 20px sans-serif';
                eCtx.textAlign = 'center';
                eCtx.fillText(`${id}`, x + 30, y + 33);

                // Border for each cell
                eCtx.strokeStyle = '#fee2e2'; // red-100
                eCtx.lineWidth = 4;
                eCtx.beginPath();
                eCtx.roundRect(x, y, cellWidth, cellHeight, 12);
                eCtx.stroke();

                resolve();
            };
            img.src = uploads[id].dataUrl;
        });
    });

    Promise.all(promises).then(() => {
        // Footer text
        eCtx.fillStyle = '#7f1d1d'; // red-900
        eCtx.font = '24px sans-serif';
        eCtx.textAlign = 'center';
        eCtx.fillText(`ยืนยันความสำเร็จเมื่อ: ${new Date().toLocaleString('th-TH')}`, exportCanvas.width / 2, exportCanvas.height - 50);
        
        eCtx.font = '18px sans-serif';
        eCtx.fillStyle = '#991b1b';
        eCtx.fillText(`สะสมครบ ${uploadsCount} จุด`, exportCanvas.width / 2, exportCanvas.height - 25);

        const link = document.createElement('a');
        link.download = `kad-gom-mission-${user.name}.jpg`;
        link.href = exportCanvas.toDataURL('image/jpeg', 0.85);
        link.click();
        setIsGenerating(false);
    });
  };

  return (
    <div className="min-h-screen bg-red-50 p-4 flex flex-col items-center justify-center pb-20">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full text-center border-t-8 border-red-600">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-red-50">
            <CheckCircle className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">ภารกิจสำเร็จ!</h2>
        <p className="text-slate-500 mb-8">คุณได้ส่งข้อมูลเรียบร้อยแล้ว</p>

        {/* Mini Grid Preview */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-1 mb-8 opacity-80 pointer-events-none select-none max-h-60 overflow-hidden mask-image-linear">
             {Object.entries(uploads).map(([id, img]) => (
                 <div key={id} className="relative aspect-square">
                    <img src={img.dataUrl} className="w-full h-full object-cover rounded-sm bg-slate-200" alt="" />
                    <div className="absolute bottom-0 right-0 bg-red-600 text-white text-[8px] px-1">#{id}</div>
                 </div>
             ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                onClick={downloadImage}
                disabled={isGenerating}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold shadow-xl shadow-red-200 flex items-center justify-center gap-2 transition-transform hover:-translate-y-1"
            >
                {isGenerating ? (
                    <>กำลังประมวลผล...</>
                ) : (
                    <>
                        <Download className="w-5 h-5" />
                        ดาวน์โหลดใบประกาศ
                    </>
                )}
            </button>
            
            <button
                onClick={onReset}
                className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full font-bold flex items-center justify-center gap-2"
            >
                <RefreshCcw className="w-5 h-5" />
                เริ่มเล่นใหม่
            </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default function App() {
  const [state, setState] = useState<AppState>(AppState.REGISTER);
  const [user, setUser] = useState<UserProfile>({ name: '', surname: '', age: '', gender: '' });
  const [uploads, setUploads] = useState<Record<number, UploadedImage>>({});

  // Load data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ph_user');
    const savedUploads = localStorage.getItem('ph_uploads');
    const savedState = localStorage.getItem('ph_state');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedUploads) setUploads(JSON.parse(savedUploads));
    if (savedState) setState(savedState as AppState);
  }, []);

  // Save data on changes
  useEffect(() => {
    localStorage.setItem('ph_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ph_uploads', JSON.stringify(uploads));
  }, [uploads]);

  useEffect(() => {
    localStorage.setItem('ph_state', state);
  }, [state]);

  const handleStart = (userData: UserProfile) => {
    setUser(userData);
    setState(AppState.PLAYING);
  };

  const handleUpload = async (id: number, file: File) => {
    try {
      const resizedDataUrl = await resizeImage(file);
      setUploads(prev => ({
        ...prev,
        [id]: {
          id,
          dataUrl: resizedDataUrl,
          timestamp: Date.now()
        }
      }));
    } catch (error) {
      console.error("Error processing image", error);
      alert("เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('ต้องการลบรูปภาพนี้ใช่หรือไม่?')) {
      setUploads(prev => {
        const newUploads = { ...prev };
        delete newUploads[id];
        return newUploads;
      });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(uploads).length >= REQUIRED_COUNT) {
      setState(AppState.COMPLETED);
    }
  };

  const handleReset = () => {
    if (confirm('คุณต้องการล้างข้อมูลทั้งหมดและเริ่มใหม่ใช่หรือไม่?')) {
      localStorage.removeItem('ph_user');
      localStorage.removeItem('ph_uploads');
      localStorage.removeItem('ph_state');
      setUser({ name: '', surname: '', age: '', gender: '' });
      setUploads({});
      setState(AppState.REGISTER);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-red-100 selection:text-red-900">
      {state !== AppState.COMPLETED && <Header onReset={handleReset} />}
      
      <main>
        {state === AppState.REGISTER && (
          <Registration onStart={handleStart} />
        )}
        
        {state === AppState.PLAYING && (
          <GameBoard 
            user={user} 
            uploads={uploads} 
            onUpload={handleUpload}
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
        )}

        {state === AppState.COMPLETED && (
          <ResultPage 
            user={user} 
            uploads={uploads} 
            onReset={handleReset} 
          />
        )}
      </main>
    </div>
  );
}