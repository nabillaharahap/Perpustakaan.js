// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const multer = require("multer") // untuk upload file
const path = require("path") // untuk memanggil path direktori
const fs = require("fs") // untuk manajemen file
const mysql = require("mysql")
const moment = require("moment")
const md5 = require("md5")
const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpustakaan"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//==============================================BAGIAN SISWA=====================================================
app.post("/data_siswa", (req,res) => {
 
    let data = {
        id_siswa: req.body.id_siswa,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        no_absen: req.body.no_absen,
        email: req.body.email,
        password: md5 (req.body.password)
    }
 
    let sql = "insert into data_siswa set ?"
 
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.get("/data_siswa", (req, res) => {
    let sql = "select * from data_siswa"
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }            
        } else {
            response = {
                count: result.length, 
                data_siswa: result 
            }            
        }
        res.json(response) 
    })
})

app.put("/data_siswa", (req,res) => {
 
    let data = [
        {
        id_siswa: req.body.id_siswa,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        no_absen: req.body.no_absen,
        email: req.body.email,
        password:md5(req.body.password)
        },
 
        {
            id_siswa: req.body.id_siswa
        }
    ]
 
    let sql = "update data_siswa set ? where ?"
 
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})


app.delete("/data_siswa/:id", (req,res) => {
    let data = {
        id_siswa: req.params.id
    }
 
    let sql = "delete from data_siswa where ?"
 
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) 
    })
})
//==================================================BAGIAN BUKU==============================================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // set file storage
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        // generate file name 
        cb(null, "image-"+ Date.now() + path.extname(file.originalname))
    }
})


let upload = multer({storage: storage})




app.post("/data_buku", upload.single("image"), (req, res) => {
    let data = {
        id_buku: req.body.id_buku,
        judul_buku: req.body.judul_buku,
        jumlah_halaman_buku: req.body.jumlah_halaman_buku,
        keterangan_kondisi_buku: req.body.keterangan_kondisi_buku,
        image: req.file.filename
    }


    if (!req.file) {
        res.json({
            message: "Tidak ada file yang dikirim"
        })
    } else {
        let sql = "insert into data_buku set ?"

        db.query(sql, data, (error, result) => {
            if(error) throw error
            res.json({
                message: result.affectedRows + " data berhasil disimpan"
            })
        })
    }
})

app.put("/data_buku", upload.single("image"), (req,res) => {
    let data = null, sql = null
    let param = { id_buku: req.body.id_buku }


    if (!req.file) {
        // jika tidak ada file yang dikirim = update data saja
        data = {
            id_buku: req.body.id_buku,
            judul_buku: req.body.judul_buku,
            jumlah_halaman_buku: req.body.jumlah_halaman_buku,
            keterangan_kondisi_buku: req.body.keterangan_kondisi_buku
        }
    } else {
        // jika mengirim file = update data + reupload
        data = {
            id_buku: req.body.id_buku,
            judul_buku: req.body.judul_buku,
            jumlah_halaman_buku: req.body.jumlah_halaman_buku,
            keterangan_kondisi_buku: req.body.keterangan_kondisi_buku,
            image: req.file.filename
        }


        sql = "select * from data_buku where ?"
        // run query
        db.query(sql, param, (err, result) => {
            if (err) throw err
            // tampung nama file yang lama
            let fileName = result[0].image


            // hapus file yg lama
            let dir = path.join(__dirname,"image",fileName)
            fs.unlink(dir, (error) => {})
        })


    }


    // create sql update
    sql = "update data_buku set ? where ?"


    // run sql update
    db.query(sql, [data,param], (error, result) => {
        if (error) {
            res.json({
                message: error.message
            })
        } else {
            res.json({
                message: result.affectedRows + " data berhasil diubah"
            })
        }
    })
})

app.delete("/data_buku/:id_buku", (req,res) => {
    let param = {id_buku: req.params.id_buku}


    // ambil data yang akan dihapus
    let sql = "select * from data_buku where ?"

    // run query
    db.query(sql, param, (error, result) => {
        if (error) throw error

        // res.json({result: result})
        
        // tampung nama file yang lama
        let fileName = result[0].image


        // hapus file yg lama
        let dir = path.join(__dirname,"image",fileName)
        fs.unlink(dir, (error) => {})
    })


    // create sql delete
    sql = "delete from data_buku where ?"


    // run query
    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({
                message: error.message
            })
        } else {
            res.json({
                message: result.affectedRows + " data berhasil dihapus"
            })
        }      
    })
})

// endpoint ambil data barang
app.get("/data_buku", (req, res) => {
    // create sql query
    let sql = "select * from data_buku"


    // run query
    db.query(sql, (error, result) => {
        if (error) throw error
        res.json({
            data: result,
            count: result.length
        })
    })
})
//================================================BAGIAN PETUGAS==================================================
app.get("/petugas", (req, res) => {
    let sql = "select * from petugas"
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }            
        } else {
            response = {
                count: result.length, 
                petugas: result 
            }            
        }
        res.json(response) 
    })
})

app.get("/petugas/:id", (req, res)=> {
    let data = {
        id_petugas: req.params.id
    }
    let sql = "select * from petugas where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }            
        } else {
            response = {
                count: result.length, 
                petugas: result 
            }            
        }
        res.json(response) 
    })
})

app.post("/petugas", (req,res) => {

    let data = {
        id_petugas: req.body.id_petugas,
        nama_petugas: req.body.nama_petugas,
        username: req.body.username,
        password: md5 (req.body.password),
        no_telp: req.body.password
    }
 
    let sql = "insert into petugas set ?"
 
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.put("/petugas", (req,res) => {
 
    let data = [
        {
        id_petugas: req.body.id_petugas,
        nama_petugas: req.body.nama_petugas,
        username: req.body.username,
        password: md5 (req.body.password),
        no_telp: req.body.no_telp
        },
 
        {
            id_petugas: req.body.id_petugas
        }
    ]
 
    let sql = "update petugas set ? where ?"
 
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/petugas/:id", (req,res) => {
    let data = {
        id_user: req.params.id
    }
 
    let sql = "delete from petugas where ?"
 
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) 
    })
})
//====================================================TRANSAKSI==================================================
app.post("/peminjaman", (req,res) => {
    //type data 
     let data = {
         id_siswa: req.body.id_siswa,
         id_petugas: req.body.id_petugas,
         tgl_peminjaman: moment().format("YYYY-MM-DD HH:mm:ss"),
         tgl_pengembalian: req.body.tgl_pengembalian
     }
    
     let sql = "insert into peminjaman set ?"
 
     let buku = JSON.parse(req.body.buku)
     
     db.query(sql, data, (error, result) => {
         let response = null
 
         if (error) {
             res.json({message: error.message})
         } else {
 
             let lastID = result.insertId
             let data2 = []
             for (let index = 0; index < buku.length; index++) {
                 data2.push([
                     lastID, buku[index].id_buku
                 ])
                }
                
             let sql = "insert into detail_peminjaman values ?"
 
             db.query(sql, [data2], (error, result) => {
                 if (error) {
                     res.json ({message: error.message})
                 } else {
                     res.json({message: "Data has been inserted"})
                 }
             })
            }
         
     })
 })
 
 app.get("/peminjaman", (req,res) => {
     let sql = "select p.id_peminjaman, p.id_siswa,p.tgl_peminjaman,p.tgl_pengembalian, s.nama_siswa, p.id_petugas, u.nama_petugas " +
      "from peminjaman p join data_siswa s on p.id_siswa = s.id_siswa " +
      "join petugas u on p.id_petugas = u.id_petugas"
  
     db.query(sql, (error, result) => {
         if (error) {
             res.json({ message: error.message})   
         }else{
             res.json({
                 count: result.length,
                 peminjaman: result
             })
         }
     })
 })
 
 app.get("/peminjaman/:id_peminjaman", (req,res) => {
     let param = { id_peminjaman: req.params.id_peminjaman}
 
     let sql = "select p.judul_buku " + "from detail_peminjaman dp join peminjaman p " + "on p.id_peminjaman = dp.id_peminjaman " + "where ?"
 
  
     db.query(sql, param, (error, result) => {
         if (error) {
             res.json({ message: error.message})   
         }else{
             res.json({
                 count: result.length,
                 detail_peminjaman: result
             })
         }
     })
 })
 
 app.delete("/peminjaman/:id_peminjaman", (req, res) => {
     let param = { id_peminjaman: req.params.id_peminjaman}
  
     let sql = "delete from detail_peminjaman where ?"
  
     db.query(sql, params, (error, result) => {
         if (error) {
             res.json({ message: error.message})
         } else {
             let param = { id_peminjaman: req.params.id_peminjamaan}
             let sql = "delete from peminjaman where ?"
  
             db.query(sql, param, (error, result) => {
                 if (error) {
                     res.json({ message: error.message})
                 } else {
                     res.json({message: "Data has been deleted"})
                 }
             })
         }
     })
  
 })
app.listen(8000, () => {
    console.log("berhasil");
})