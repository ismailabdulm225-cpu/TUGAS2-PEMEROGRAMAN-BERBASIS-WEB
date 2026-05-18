<<<<<<< HEAD
const { createApp } = Vue;
createApp({
    data() {
        return {
            pengirimanList: window.dataBahanAjar?.pengirimanList || [],
            paketList: window.dataBahanAjar?.paket || [],
            tracking: window.dataBahanAjar?.tracking || {},
            showAddForm: false,
            showDetailModal: false,

            formData: {
                nim: "",
                nama: "",
                ekspedisi: "",
                paket: "",
                tanggalKirim: ""
            },
            formErrors: {},
            selectedPaket: null,
            selectedDetail: null
        };
    },

    computed: {
        // AUTO GENERATE NOMOR DO
        nextDO() {
            const year = new Date().getFullYear();
            const allNumbers = Object.keys(this.tracking)
                .map(k => {
                    // FORMAT: DO2025-001
                    const match = k.match(/DO\d{4}-(\d{4})/);
                    return match
                        ? parseInt(match[1])
                        : null;
                })
                .filter(n => n !== null && !isNaN(n));
            const next =
                allNumbers.length
                    ? Math.max(...allNumbers) + 1
                    : 1;
            return `DO${year}-${String(next).padStart(4, "0")}`;
        },

        // TOTAL HARGA OTOMATIS
        totalHarga() {
            const p =
                this.paketList.find(
                    x => x.kode === this.formData.paket
                );
            return p ? p.harga : 0;
        },

        // TRACKING LIST
        trackingList() {
            return Object.entries(this.tracking)
                .map(([noDO, data]) => ({
                    noDO,
                    ...data
                }))
                .reverse();
        }
    },
    watch: {
        // DETAIL PAKET OTOMATIS
        "formData.paket"(val) {
            this.selectedPaket =
                this.paketList.find(
                    p => p.kode === val
                );
        },
        
        // AUTO TANGGAL
        showAddForm(val) {
            if (val && !this.formData.tanggalKirim) {
                this.formData.tanggalKirim =
                    new Date()
                        .toISOString()
                        .split("T")[0];
            }
        }
    },

    methods: {
        // SHOW / HIDE FORM
        toggleAddForm() {
            this.showAddForm =
                !this.showAddForm;
            if (!this.showAddForm) {
                this.resetForm();
            }
        },

        // RESET FORM
        resetForm() {
            this.formData = {
                nim: "",
                nama: "",
                ekspedisi: "",
                paket: "",
                tanggalKirim: ""
            };
            this.selectedPaket = null;
            this.formErrors = {};
        },

        // VALIDASI
        validateForm() {
            this.formErrors = {};
            if (!this.formData.nim) {
                this.formErrors.nim =
                    "NIM wajib diisi";
            }

            if (!this.formData.nama) {
                this.formErrors.nama =
                    "Nama wajib diisi";
            }

            if (!this.formData.ekspedisi) {
                this.formErrors.ekspedisi =
                    "Ekspedisi wajib dipilih";
            }

            if (!this.formData.paket) {
                this.formErrors.paket =
                    "Paket wajib dipilih";
            }

            if (!this.formData.tanggalKirim) {
                this.formErrors.tanggalKirim =
                    "Tanggal wajib diisi";
            }

            return Object.keys(this.formErrors).length === 0;
        },

        // SIMPAN DO
        submitForm() {
            if (!this.validateForm()) return;
            const noDO = this.nextDO;
            this.tracking[noDO] = {
                nim: this.formData.nim,
                nama: this.formData.nama,
                // STATUS AWAL
                status: "Diproses",
                // SIMPAN KODE REG / EXP
                ekspedisi: this.formData.ekspedisi,
                paket: this.formData.paket,
                tanggalKirim:
                    this.formData.tanggalKirim,
                total: this.totalHarga,
                perjalanan: [
                    {
                        waktu:
                            new Date().toLocaleString(),
                        keterangan:
                            "DO dibuat dan diproses di sistem"
                    }
                ]
            };
            this.resetForm();
            this.showAddForm = false;
            alert(`DO ${noDO} berhasil dibuat`);
        },

        // KONVERSI KODE EKSPEDISI
        getPengiriman(kode) {
            const item =
                this.pengirimanList.find(
                    p => p.kode === kode
                );

            return item
                ? item.nama
                : "-";
        },

        // DETAIL MODAL
        openDetail(item) {
            this.selectedDetail = item;
            this.showDetailModal = true;
        },

        closeDetail() {
            this.showDetailModal = false;
            this.selectedDetail = null;
        },

        // STATUS CLASS
        statusClass(status) {
            switch (status) {
                case "Diproses":
                    return "status-proses";
                case "Dalam Perjalanan":
                    return "status-perjalanan";
                case "Diterima":
                    return "status-diterima";
                default:
                    return "status-default";
            }
        }
    }

}).mount("#tracking-app");
=======
const { createApp } = Vue;
createApp({
    data() {
        return {
            pengirimanList: window.dataBahanAjar?.pengirimanList || [],
            paketList: window.dataBahanAjar?.paket || [],
            tracking: window.dataBahanAjar?.tracking || {},
            showAddForm: false,
            showDetailModal: false,

            formData: {
                nim: "",
                nama: "",
                ekspedisi: "",
                paket: "",
                tanggalKirim: ""
            },
            formErrors: {},
            selectedPaket: null,
            selectedDetail: null
        };
    },

    computed: {
        // AUTO GENERATE NOMOR DO
        nextDO() {
            const year = new Date().getFullYear();
            const allNumbers = Object.keys(this.tracking)
                .map(k => {
                    // FORMAT: DO2025-001
                    const match = k.match(/DO\d{4}-(\d{4})/);
                    return match
                        ? parseInt(match[1])
                        : null;
                })
                .filter(n => n !== null && !isNaN(n));
            const next =
                allNumbers.length
                    ? Math.max(...allNumbers) + 1
                    : 1;
            return `DO${year}-${String(next).padStart(4, "0")}`;
        },

        // TOTAL HARGA OTOMATIS
        totalHarga() {
            const p =
                this.paketList.find(
                    x => x.kode === this.formData.paket
                );
            return p ? p.harga : 0;
        },

        // TRACKING LIST
        trackingList() {
            return Object.entries(this.tracking)
                .map(([noDO, data]) => ({
                    noDO,
                    ...data
                }))
                .reverse();
        }
    },
    watch: {
        // DETAIL PAKET OTOMATIS
        "formData.paket"(val) {
            this.selectedPaket =
                this.paketList.find(
                    p => p.kode === val
                );
        },
        
        // AUTO TANGGAL
        showAddForm(val) {
            if (val && !this.formData.tanggalKirim) {
                this.formData.tanggalKirim =
                    new Date()
                        .toISOString()
                        .split("T")[0];
            }
        }
    },

    methods: {
        // SHOW / HIDE FORM
        toggleAddForm() {
            this.showAddForm =
                !this.showAddForm;
            if (!this.showAddForm) {
                this.resetForm();
            }
        },

        // RESET FORM
        resetForm() {
            this.formData = {
                nim: "",
                nama: "",
                ekspedisi: "",
                paket: "",
                tanggalKirim: ""
            };
            this.selectedPaket = null;
            this.formErrors = {};
        },

        // VALIDASI
        validateForm() {
            this.formErrors = {};
            if (!this.formData.nim) {
                this.formErrors.nim =
                    "NIM wajib diisi";
            }

            if (!this.formData.nama) {
                this.formErrors.nama =
                    "Nama wajib diisi";
            }

            if (!this.formData.ekspedisi) {
                this.formErrors.ekspedisi =
                    "Ekspedisi wajib dipilih";
            }

            if (!this.formData.paket) {
                this.formErrors.paket =
                    "Paket wajib dipilih";
            }

            if (!this.formData.tanggalKirim) {
                this.formErrors.tanggalKirim =
                    "Tanggal wajib diisi";
            }

            return Object.keys(this.formErrors).length === 0;
        },

        // SIMPAN DO
        submitForm() {
            if (!this.validateForm()) return;
            const noDO = this.nextDO;
            this.tracking[noDO] = {
                nim: this.formData.nim,
                nama: this.formData.nama,
                // STATUS AWAL
                status: "Diproses",
                // SIMPAN KODE REG / EXP
                ekspedisi: this.formData.ekspedisi,
                paket: this.formData.paket,
                tanggalKirim:
                    this.formData.tanggalKirim,
                total: this.totalHarga,
                perjalanan: [
                    {
                        waktu:
                            new Date().toLocaleString(),
                        keterangan:
                            "DO dibuat dan diproses di sistem"
                    }
                ]
            };
            this.resetForm();
            this.showAddForm = false;
            alert(`DO ${noDO} berhasil dibuat`);
        },

        // KONVERSI KODE EKSPEDISI
        getPengiriman(kode) {
            const item =
                this.pengirimanList.find(
                    p => p.kode === kode
                );

            return item
                ? item.nama
                : "-";
        },

        // DETAIL MODAL
        openDetail(item) {
            this.selectedDetail = item;
            this.showDetailModal = true;
        },

        closeDetail() {
            this.showDetailModal = false;
            this.selectedDetail = null;
        },

        // STATUS CLASS
        statusClass(status) {
            switch (status) {
                case "Diproses":
                    return "status-proses";
                case "Dalam Perjalanan":
                    return "status-perjalanan";
                case "Diterima":
                    return "status-diterima";
                default:
                    return "status-default";
            }
        }
    }

}).mount("#tracking-app");
>>>>>>> 0502e7c99e052c539a9c48de8b044e208a6b5f39
