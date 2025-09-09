'use client';

import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setReply('');

try {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input })
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Unknown error');
  }

  setReply(data.reply);
} catch (err) {
  setReply('Error: ' + err.message);
}


  return (
    <main style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h1>Compliance Companion</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me something..."
          style={{ width: '80%', padding: 8 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 4 }}>
          Send
        </button>
      </form>
      <div style={{ marginTop: 20, textAlign: 'left', whiteSpace: 'pre-wrap' }}>
        {loading ? 'Thinking…' : reply}
      </div>
    </main>
  );
}
