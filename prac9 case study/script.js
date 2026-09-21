document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('.schedule-table tbody');
  const resetButton = document.querySelector('#reset-schedule');
  const scheduleStorageKey = 'schedulePlannerRows';
  const selectedRowStorageKey = 'schedulePlannerSelectedRow';

  const getRows = () => [...tableBody.querySelectorAll('tr')].map((row) => ({
    day: row.dataset.day,
    begin: row.dataset.begin,
    end: row.dataset.end,
    topic: row.dataset.topic,
  }));

  const saveSchedule = () => {
    localStorage.setItem(scheduleStorageKey, JSON.stringify(getRows()));
  };

  const showRowInfo = (row) => {
    const day = row.dataset.day || 'Unknown day';
    const begin = row.dataset.begin || '';
    const end = row.dataset.end || '';
    const topic = row.dataset.topic || 'No topic assigned';

    tableBody.querySelectorAll('tr').forEach((item) => item.classList.remove('selected-row'));
    row.classList.add('selected-row');
    sessionStorage.setItem(selectedRowStorageKey, JSON.stringify({ day, begin, end, topic }));
    alert(`${day}: ${begin} to ${end}\nTopic: ${topic}`);
  };

  const createRow = (day, begin, end, topic) => {
    const newRow = document.createElement('tr');
    newRow.dataset.day = day;
    newRow.dataset.begin = begin;
    newRow.dataset.end = end;
    newRow.dataset.topic = topic;
    newRow.innerHTML = `
      <td class="day-cell">${day}</td>
      <td class="schedule-cell green">${begin}</td>
      <td class="schedule-cell purple">${end}</td>
      <td class="topic-cell">${topic}</td>
      <td class="action-cell">
        <button class="insert-btn" type="button">Insert</button>
        <button class="delete-btn" type="button">Delete</button>
      </td>
    `;

    return newRow;
  };

  const bindRowEvents = (row) => {
    row.addEventListener('click', (event) => {
      if (event.target.closest('button')) return;
      showRowInfo(row);
    });

    const insertButton = row.querySelector('.insert-btn');
    const deleteButton = row.querySelector('.delete-btn');

    insertButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const nextRow = createRow('Thursday', '9:00 a.m.', '10:00 a.m.', 'New Topic');
      row.after(nextRow);
      saveSchedule();
    });

    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      row.remove();
      saveSchedule();
    });
  };

  const savedRows = JSON.parse(localStorage.getItem(scheduleStorageKey) || 'null');

  if (Array.isArray(savedRows)) {
    tableBody.replaceChildren(...savedRows.map((item) => createRow(item.day, item.begin, item.end, item.topic)));
  } else {
    document.querySelectorAll('.schedule-table tbody tr').forEach(bindRowEvents);
    saveSchedule();
  }

  if (Array.isArray(savedRows)) {
    tableBody.querySelectorAll('tr').forEach(bindRowEvents);
  }

  const selectedRow = JSON.parse(sessionStorage.getItem(selectedRowStorageKey) || 'null');
  if (selectedRow) {
    const matchingRow = [...tableBody.querySelectorAll('tr')].find((row) => (
      row.dataset.day === selectedRow.day
      && row.dataset.begin === selectedRow.begin
      && row.dataset.end === selectedRow.end
      && row.dataset.topic === selectedRow.topic
    ));
    matchingRow?.classList.add('selected-row');
  }

  resetButton.addEventListener('click', () => {
    localStorage.removeItem(scheduleStorageKey);
    sessionStorage.removeItem(selectedRowStorageKey);
    window.location.reload();
  });
});
