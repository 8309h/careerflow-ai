import React, { useState } from 'react';
import styles from './NotesEditor.module.css';

const NotesEditor = ({ initial, onSave, placeholder }) => {
  const [text, setText] = useState(initial || '');
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(text);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={text}
        placeholder={placeholder || 'Add notes...'}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.actions}>
        <button className={styles.save} onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default NotesEditor;
