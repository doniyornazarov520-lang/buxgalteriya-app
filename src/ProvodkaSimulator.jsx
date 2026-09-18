import React, { useState } from 'react';
import simulatorTasks from './simulatorData.json';

const styles = {
  container: { marginTop: '10px' },
  subTitle: { fontSize: '14px', color: '#555' },
  taskCard: { backgroundColor: '#fdfdfd', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', marginBottom: '15px' },
  taskText: { fontSize: '15px', color: '#2d3748' },
  inputGroup: { display: 'flex', gap: '15px', margin: '15px 0', flexWrap: 'wrap' },
  input: { display: 'block', marginTop: '5px', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0', width: '150px' },
  checkBtn: { backgroundColor: '#4c51bf', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  resultBox: { marginTop: '15px', padding: '12px', borderRadius: '6px' }
};

function ProvodkaSimulator({ currentLessonId }) {
  const tasks = simulatorTasks.filter(t => t.lesson_id === currentLessonId);

  const [debitInput, setDebitInput] = useState('');
  const [creditInput, setCreditInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [taskResults, setTaskResults] = useState({});

  if (tasks.length === 0) {
    return (
      <div style={styles.container}>
        <p><i>Ushbu dars bo'yicha hozircha amaliy simulyatsiya topshiriqlari mavjud emas.</i></p>
      </div>
    );
  }

  const handleCheck = (taskId, correctDebit, correctCredit, correctAmount) => {
    const isDebitCorrect = debitInput.trim() === correctDebit;
    const isCreditCorrect = creditInput.trim() === correctCredit;
    const isAmountCorrect = Number(amountInput) === correctAmount;

    setTaskResults({
      ...taskResults,
      [taskId]: {
        checked: true,
        isSuccess: isDebitCorrect && isCreditCorrect && isAmountCorrect,
        isDebitCorrect,
        isCreditCorrect,
        isAmountCorrect
      }
    });
  };

  return (
    <div style={styles.container}>
      <h3>🎮 Buxgalteriya Provodkalari Simulyatori</h3>
      <p style={styles.subTitle}>Berilgan operatsiya bo'yicha to'g'ri Debet, Kredit schetini va summani kiriting:</p>

      {tasks.map((task) => {
        const res = taskResults[task.id];

        return (
          <div key={task.id} style={styles.taskCard}>
            <p style={styles.taskText}><strong>Topshiriq:</strong> {task.task}</p>

            <div style={styles.inputGroup}>
              <div>
                <label>Debet (Schet):</label>
                <input
                  type="text"
                  placeholder="masalan: 1010"
                  value={debitInput}
                  onChange={(e) => setDebitInput(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div>
                <label>Kredit (Schet):</label>
                <input
                  type="text"
                  placeholder="masalan: 6010"
                  value={creditInput}
                  onChange={(e) => setCreditInput(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div>
                <label>Summa (so'mda):</label>
                <input
                  type="number"
                  placeholder="masalan: 15000000"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            <button
              onClick={() => handleCheck(task.id, task.correct_debit, task.correct_credit, task.correct_amount)}
              style={styles.checkBtn}
            >
              Provodkani tekshirish
            </button>

            {res && res.checked && (
              <div style={{
                ...styles.resultBox,
                backgroundColor: res.isSuccess ? '#d4edda' : '#f8d7da',
                color: res.isSuccess ? '#155724' : '#721c24'
              }}>
                <h4>{res.isSuccess ? '🎉 Barakalla! Provodka to\'g\'ri tuzildi.' : '⚠️ Xatolik bor!'}</h4>
                {!res.isSuccess && (
                  <ul>
                    {!res.isDebitCorrect && <li>Debet scheti noto'g'ri (To'g'risi: {task.correct_debit})</li>}
                    {!res.isCreditCorrect && <li>Kredit scheti noto'g'ri (To'g'risi: {task.correct_credit})</li>}
                    {!res.isAmountCorrect && <li>Summa noto'g'ri kiritildi</li>}
                  </ul>
                )}
                <p><i><strong>Mantiqiy izoh:</strong> {task.explanation}</i></p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProvodkaSimulator;
