"use client";

interface DownloadButtonProps {
  fileUrl: string;
}

export default function DownloadButton({ fileUrl }: DownloadButtonProps) {
  const handleViewPDF = () => {
    // Use Google Docs PDF viewer
    const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
    window.open(googleViewerUrl, "_blank");
  };

  return (
    <button
      onClick={handleViewPDF}
      className="bg-[#ff6700] text-white px-5 py-2 rounded-md hover:opacity-90 transition-all cursor-pointer"
    >
      View PDF
    </button>
  );
}