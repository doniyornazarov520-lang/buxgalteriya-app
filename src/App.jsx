import React, { useState } from 'react'
import ProvodkaSimulator from './ProvodkaSimulator.jsx'

function App() {
  const [currentLessonId, setCurrentLessonId] = useState(1);

  // Darslar uchun video havolalari (YouTube embed)
  const lessonVideos = {
    1: "https://www.youtube.com/embed/thmFcgFxUaM?si=CLI5IpOe1dLr1sVu", // 1-Dars videosi
    2: "https://www.youtube.com/embed/R4boj3wqVYk?si=w25KJB74J4RlTcpO"  // 2-Dars videosi
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Buxgalteriya Darslari va Simulyator</h1>
      <p>Amaliy topshiriqlarni bajarish uchun darsni tanlang:</p>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setCurrentLessonId(1)}
          style={{
            padding: '8px 16px',
            backgroundColor: currentLessonId === 1 ? '#4c51bf' : '#e2e8f0',
            color: currentLessonId === 1 ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          1-Dars
        </button>
        <button 
          onClick={() => setCurrentLessonId(2)}
          style={{
            padding: '8px 16px',
            backgroundColor: currentLessonId === 2 ? '#4c51bf' : '#e2e8f0',
            color: currentLessonId === 2 ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          2-Dars
        </button>
      </div>

      {/* Video pleyer bo'limi */}
      <div style={{ marginBottom: '30px' }}>
        <h3>📹 {currentLessonId}-Dars Videosi</h3>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', backgroundColor: '#000' }}>
          <iframe
            src={lessonVideos[currentLessonId]}
            title={`${currentLessonId}-Dars Videosi`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <hr style={{ margin: '20px 0', border: '0.5px solid #eee' }} />

      <ProvodkaSimulator currentLessonId={currentLessonId} />
    </div>
  )
}

export default App
