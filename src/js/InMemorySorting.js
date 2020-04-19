/* eslint class-methods-use-this: 0 */
class InMemorySorting {
  constructor() {
    this.dataJSON = [
      {
        id: 26,
        title: 'Побег из Шоушенка',
        imdb: 9.30,
        year: 1994,
      },
      {
        id: 25,
        title: 'Крёстный отец',
        imdb: 9.20,
        year: 1972,
      },
      {
        id: 27,
        title: 'Крёстный отец 2',
        imdb: 9.00,
        year: 1974,
      },
      {
        id: 1047,
        title: 'Тёмный рыцарь',
        imdb: 9.00,
        year: 2008,
      },
      {
        id: 223,
        title: 'Криминальное чтиво',
        imdb: 8.90,
        year: 1994,
      },
    ];
  }

  loadList() {
    this.drawTable();
  }

  drawTable() {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    for (const element of this.dataJSON) {
      const tr = document.createElement('tr');
      tr.dataset.id = element.id;
      tr.dataset.title = element.title;
      tr.dataset.year = element.year;
      tr.dataset.imdb = element.imdb;
      tr.innerHTML = `
        <td>${element.id}</td>
        <td>${element.title}</td>
        <td>(${element.year})</td>
        <td>imdb: ${element.imdb.toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    }
  }

  sortData(columnSort, sortUpDown) {
    const oldRow = document.querySelector('span');
    if (oldRow) {
      const parentOldRow = oldRow.parentNode;
      parentOldRow.removeChild(oldRow);
    }

    let sortArrow;
    sortArrow = '\u{2193}';
    if (sortUpDown === 'up') {
      sortArrow = '\u{2191}';
    }

    const head = document.getElementById(`head-${columnSort}`);
    const spanArrow = document.createElement('span');
    spanArrow.innerText = sortArrow;
    head.appendChild(spanArrow);
  }

  sortStringDown(columnSort) {
    this.sortData(columnSort, 'down');
    this.sortList('string', columnSort, 'down');
  }

  sortStringUp(columnSort) {
    this.sortData(columnSort, 'up');
    this.sortList('number', columnSort, 'up');
  }

  sortNumberDown(columnSort) {
    this.sortData(columnSort, 'down');
    this.sortList('number', columnSort, 'down');
  }

  sortNumberUp(columnSort) {
    this.sortData(columnSort, 'up');
    this.sortList('number', columnSort, 'up');
  }

  sortList(columnType, columnSort, sortUpDown) {
    if (columnType === 'string') {
      this.sortString(columnSort, sortUpDown);
    } else if (columnType === 'number') {
      this.sortNumber(columnSort, sortUpDown);
    }
    this.drawTable();
  }

  sortString(columnSort, sortUpDown) {
    this.dataJSON.sort((a, b) => {
      if (a[columnSort] > b[columnSort]) {
        return sortUpDown === 'down' ? -1 : 1;
      }
      if (a[columnSort] < b[columnSort]) {
        return sortUpDown === 'down' ? 1 : -1;
      }
      return 0;
    });
  }

  sortNumber(columnSort, sortUpDown) {
    this.dataJSON.sort((a, b) => {
      if (sortUpDown === 'down') {
        return b[columnSort] - a[columnSort];
      }
      return a[columnSort] - b[columnSort];
    });
  }

  changeColumnsUpDown() {
    let item = 1;
    setInterval(() => {
      switch (item) {
        case 1:
          this.sortNumberUp('id');
          break;
        case 2:
          this.sortNumberDown('id');
          break;
        case 3:
          this.sortStringUp('title');
          break;
        case 4:
          this.sortStringDown('title');
          break;
        case 5:
          this.sortNumberUp('year');
          break;
        case 6:
          this.sortNumberDown('year');
          break;
        case 7:
          this.sortNumberUp('imdb');
          break;
        default:
          this.sortNumberDown('imdb');
          item = 0;
          break;
      }
      item += 1;
    }, 1000);
  }
}

const gamesBoard = new InMemorySorting();
gamesBoard.loadList();
gamesBoard.changeColumnsUpDown();