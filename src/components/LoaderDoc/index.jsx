"use client";
import { useEffect, useRef, useState } from "react";

let webViewerInitialized = false;

export default function DocumentModal() {
  const viewer = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadWebViewer = async () => {
      if (!webViewerInitialized) {
        const { default: WebViewer } = await import("@pdftron/webviewer");
        await WebViewer(
          {
            path: "/webviewer/lib",
            licenseKey:
              "demo:1730683410052:7ee471af03000000006942ba58413fff95fec6f4f071d4345af7e34045",
            initialDoc: "/Nota de egreso.docx",
            enableOfficeEditing: true,
          },
          viewer.current
        );
        webViewerInitialized = true;
      }
    };

    if (isOpen) {
      loadWebViewer().catch((error) => {
        console.error("Error loading WebViewer:", error);
      });
    }
  }, [isOpen]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Abrir Documento
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-600 text-white hover:bg-red-700 text-3xl font-bold py-1 px-2 rounded-full"
            >
              &times;
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg w-11/12 h-11/12 md:w-3/4 md:h-3/4 relative">
            <div
              className="webviewer"
              ref={viewer}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
