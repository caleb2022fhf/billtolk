import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div style={styles.container}>
      {/* Top Header - Instagram Style but Custom Positions */}
      <header style={styles.header}>
        <h2 style={styles.logo}>Billtolk 📸</h2>
        <div style={styles.topIcons}>
          <span style={styles.icon}>💬</span> {/* Chat Icon moved to top */}
          <span style={styles.icon}>❤️</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={styles.main}>
        {activeTab === 'feed' && (
          <div style={styles.feed}>
            <div style={styles.postCard}>
              <div style={styles.postHeader}>
                <strong>jean_bosco</strong>
              </div>
              <div style={styles.postImagePlaceholder}>
                <p>Image Post Content</p>
              </div>
              <div style={styles.postActionsCustom}>
                {/* Custom Button and Icon Positioning */}
                <button style={styles.customButton}>Like 👍</button>
                <button style={styles.customButton}>Comment 💬</button>
                <span style={styles.saveIconCustom}>💾</span>
              </div>
              <p style={styles.caption}><strong>jean_bosco</strong> Kora chat na posts hano kuri Billtolk!</p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav style={styles.bottomNav}>
        <button onClick={() => setActiveTab('feed')} style={styles.navBtn}>🏠 Home</button>
        <button onClick={() => setActiveTab('search')} style={styles.navBtn}>🔍 Search</button>
        <button onClick={() => setActiveTab('post')} style={styles.navBtn}>➕ New Post</button>
        <button onClick={() => setActiveTab('chat')} style={styles.navBtn}>✉️ Chats</button>
        <button onClick={() => setActiveTab('profile')} style={styles.navBtn}>👤 Profile</button>
      </nav>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', background: '#fafafa', minHeight: '100vh', paddingBottom: '60px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', background: '#fff', borderBottom: '1px solid #dbdbdb', position: 'sticky', top: 0, zIndex: 10 },
  logo: { margin: 0, fontSize: '20px', fontWeight: 'bold' },
  topIcons: { display: 'flex', gap: '15px', fontSize: '20px' },
  main: { padding: '10px' },
  feed: { display: 'flex', flexDirection: 'column', gap: '15px' },
  postCard: { background: '#fff', border: '1px solid #dbdbdb', borderRadius: '8px', overflow: 'hidden' },
  postHeader: { padding: '10px', borderBottom: '1px solid #efefef' },
  postImagePlaceholder: { height: '300px', background: '#efefef', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#888' },
  postActionsCustom: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' },
  customButton: { background: '#0095f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  saveIconCustom: { fontSize: '20px', cursor: 'pointer' },
  caption: { padding: '0 10px 10px 10px', margin: 0, fontSize: '14px' },
  bottomNav: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #dbdbdb', height: '50px', maxWidth: '480px', margin: '0 auto' },
  navBtn: { background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer' }
};

export default App;
