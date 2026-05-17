const { createApp } = Vue;

createApp({

  data() {
    return {

      // ===== AMBIL DARI DATA UTAMA =====
      upbjjList: dataBahanAjar.upbjjList,
      kategoriList: dataBahanAjar.kategoriList,

      stok: dataBahanAjar.stok,

      // ===== FILTER =====
      filterUpbjj: "",
      filterKategori: "",
      filterLowStock: false,
      filterEmptyStock: false,
      sortBy: "",

      // ===== FORM DATA =====
      newItem: {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        qty: 0,
        safety: 0,
        harga: 0,
        catatanHTML: ""
      },

      // ===== UI STATE =====
      showFormModal: false,
      isEdit: false,
      editIndex: -1

    };
  },

  computed: {

    // ===== FILTER + SORT =====
    filteredStok() {

      let data = [...this.stok];

      // FILTER UPBJJ
      if (this.filterUpbjj) {
        data = data.filter(i => i.upbjj === this.filterUpbjj);
      }

      // FILTER KATEGORI
      if (this.filterKategori) {
        data = data.filter(i => i.kategori === this.filterKategori);
      }

      // STOK MENIPIS
      if (this.filterLowStock) {
        data = data.filter(i => i.qty > 0 && i.qty < i.safety);
      }

      // STOK KOSONG
      if (this.filterEmptyStock) {
        data = data.filter(i => i.qty === 0);
      }

      // SORTING
      if (this.sortBy === "judul") {
        data.sort((a, b) => a.judul.localeCompare(b.judul));
      }
      else if (this.sortBy === "qty") {
        data.sort((a, b) => a.qty - b.qty);
      }
      else if (this.sortBy === "harga") {
        data.sort((a, b) => a.harga - b.harga);
      }

      return data;
    },

    // ===== KATEGORI DINAMIS =====
    kategoriFilteredList() {

      let data = this.stok;

      if (this.filterUpbjj) {
        data = data.filter(i => i.upbjj === this.filterUpbjj);
      }

      return [...new Set(data.map(i => i.kategori))];
    }

  },

  // ===== WATCH =====
  watch: {

    filterUpbjj() {
      this.filterKategori = "";
    }

  },


  methods: {

    // ===== RESET FILTER =====
    resetFilters() {

      this.filterUpbjj = "";
      this.filterKategori = "";
      this.filterLowStock = false;
      this.filterEmptyStock = false;
      this.sortBy = "";

    },

    // ===== OPEN FORM =====
    openForm() {

      this.isEdit = false;

      this.newItem = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        qty: 0,
        safety: 0,
        harga: 0,
        catatanHTML: ""
      };

      this.showFormModal = true;
    },

    // ===== CLOSE FORM =====
    closeForm() {
      this.showFormModal = false;
    },

    // ===== SAVE DATA =====
    saveData() {

      if (!this.newItem.kode || !this.newItem.judul) {
        alert("Kode & Judul wajib diisi!");
        return;
      }

      // pastikan number valid
      this.newItem.qty = Number(this.newItem.qty);
      this.newItem.safety = Number(this.newItem.safety);
      this.newItem.harga = Number(this.newItem.harga);

      if (this.isEdit) {

        // update data
        this.stok[this.editIndex] = { ...this.newItem };

      } else {

        // tambah data
        this.stok.push({ ...this.newItem });

      }

      this.closeForm();
    },

    // ===== EDIT DATA =====
    openEdit(item) {

      this.isEdit = true;

      // cari index asli di array stok
      this.editIndex = this.stok.indexOf(item);

      // copy data
      this.newItem = {
        ...item
      };

      this.showFormModal = true;
    },

    // ===== DELETE DATA =====
    hapusStok(item) {

      if (confirm("Yakin ingin menghapus data ini?")) {

        const index = this.stok.indexOf(item);

        this.stok.splice(index, 1);
      }

    }

  }

}).mount("#app");