document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pinjamanForm');
    const tableBody = document.querySelector('#pinjamanTable tbody');
    let counter = 0;

    // Fungsi untuk menambahkan baris ke tabel
    const addRow = (nama, jumlah, rekening, durasi) => {
       counter++;
       const row = document.createElement('tr');
       row.innerHTML = `
          <td>${counter}</td>
          <td>${nama}</td>
          <td>Rp ${parseInt(jumlah).toLocaleString()}</td>
          <td>${rekening}</td>
          <td>${durasi} bulan</td>
          <td>
             <button class="btn btn-warning btn-edit">Edit</button>
             <button class="btn btn-danger btn-delete">Hapus</button>
             <button class="btn btn-success btn-save">Simpan</button>
          </td>
       `;
       tableBody.appendChild(row);

       // Tambahkan event listener ke tombol Edit, Hapus, dan Simpan
       row.querySelector('.btn-edit').addEventListener('click', () => editRow(row));
       row.querySelector('.btn-delete').addEventListener('click', () => deleteRow(row));
       row.querySelector('.btn-save').addEventListener('click', () => saveRow(row));
    };

    // Fungsi untuk menangani tombol Tambah Pinjaman
    form.addEventListener('submit', (e) => {
       e.preventDefault();

       const nama = document.getElementById('nama').value;
       const jumlah = document.getElementById('jumlah').value;
       const rekening = document.getElementById('rekening').value;
       const durasi = document.getElementById('durasi').value;

       if (nama && jumlah && rekening && durasi) {
          addRow(nama, jumlah, rekening, durasi);

          // Reset form setelah data ditambahkan
          form.reset();
       }
    });

    // Fungsi untuk mengedit baris
    const editRow = (row) => {
       const cells = row.children;

       // Ambil nilai dari baris
       document.getElementById('nama').value = cells[1].textContent;
       document.getElementById('jumlah').value = cells[2].textContent.replace(/[^0-9]/g, '');
       document.getElementById('rekening').value = cells[3].textContent;
       document.getElementById('durasi').value = parseInt(cells[4].textContent);

       // Hapus baris yang sedang diedit
       deleteRow(row);
    };

    // Fungsi untuk menghapus baris
    const deleteRow = (row) => {
       row.remove();
       counter--;
    };

    // Fungsi untuk menyimpan data di baris
    const saveRow = (row) => {
       const cells = row.children;
       const nama = cells[1].textContent;
       const jumlah = cells[2].textContent;
       const rekening = cells[3].textContent;
       const durasi = cells[4].textContent;

       // Simulasi penyimpanan dan notifikasi
       alert(`Data pinjaman untuk ${nama} sejumlah ${jumlah} dengan rekening ${rekening} dan durasi ${durasi} sedang diproses.`);

       // Redirect ke dashboard setelah menyimpan
       window.location.href = 'index.html';
    };
 });