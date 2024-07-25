import { useState, useEffect } from "react";

const ARComponent = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Fungsi untuk mengirim data ke server
  const sendDataToDatabase = async (userId) => {
    try {
      const response = await fetch("http://localhost:3000/absensi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Data berhasil dikirim");
      } else {
        alert("Gagal mengirim data: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan: " + error.message);
    }
  };

  // Effect untuk menangani event markerFound
  useEffect(() => {
    const handleMarkerFound = () => {
      console.log("Marker found");
      const userId = "user123"; // Ganti dengan logika untuk mendapatkan userId
      sendDataToDatabase(userId);
    };

    if (isCameraActive) {
      const marker = document.querySelector("a-marker");
      if (marker) {
        marker.addEventListener("markerFound", handleMarkerFound);
      }
    }

    return () => {
      if (isCameraActive) {
        const marker = document.querySelector("a-marker");
        if (marker) {
          marker.removeEventListener("markerFound", handleMarkerFound);
        }
      }
    };
  }, [isCameraActive]);

  const activateCamera = () => {
    setIsCameraActive(true);
  };

  return (
    <div>
      <button onClick={activateCamera}>Aktifkan Kamera</button>
      {isCameraActive && (
        <a-scene embedded arjs="sourceType: webcam;">
          <a-marker type="pattern" url="/pattern-pas_foto.patt">
            <a-image
              src="/pattern-pas_foto.png"
              position="0 0 0"
              width="1"
              height="1"
            ></a-image>
            <a-box position="0 0.5 0" material="color: red;"></a-box>
            <a-entity
              position="0 1 0"
              text="value: Scan untuk absensi; color: black;"
            ></a-entity>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      )}
    </div>
  );
};

export default ARComponent;
