import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdukModel } from './dashboard.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  formValue !: FormGroup
  produkModelObj: ProdukModel = new ProdukModel()
  produkData !: any
  showAdd !: boolean
  showUpdate !: boolean

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.formValue = this.formBuilder.group({
      namaProduk: [''],
      keterangan: [''],
      harga: [''],
      jumlah: ['']
    })

    this.getAllProduct()
  }

  clickAddProduct() {
    this.formValue.reset()
    this.showAdd = true
    this.showUpdate = false
  }

  postProduct() {
    this.produkModelObj.nama_produk = this.formValue.value.namaProduk
    this.produkModelObj.keterangan = this.formValue.value.keterangan
    this.produkModelObj.harga = this.formValue.value.harga
    this.produkModelObj.jumlah = this.formValue.value.jumlah

    this.userService.addData(this.produkModelObj)
      .subscribe(res => {
        console.log(res)
        alert('Produk Ditambahkan')
        let ref = document.getElementById('cancel')
        ref?.click()
        this.formValue.reset()
        this.getAllProduct()
      }, err => {
        console.log(err)
      })
  }

  getAllProduct() {
    this.userService.getData()
      .subscribe(res => {
        this.produkData = res
      })
  }

  deleteProduct(id: number) {
    this.userService.deleteData(id)
      .subscribe(res => {
        alert("Produk Terhapus")
        this.getAllProduct()
      })
  }

  onEdit(row: any) {
    this.showAdd = false
    this.showUpdate = true

    this.produkModelObj.id = row.id
    this.formValue.controls['namaProduk'].setValue(row.nama_produk)
    this.formValue.controls['keterangan'].setValue(row.keterangan)
    this.formValue.controls['harga'].setValue(row.harga)
    this.formValue.controls['jumlah'].setValue(row.jumlah)
  }

  updateProduct() {
    this.produkModelObj.nama_produk = this.formValue.value.namaProduk
    this.produkModelObj.keterangan = this.formValue.value.keterangan
    this.produkModelObj.harga = this.formValue.value.harga
    this.produkModelObj.jumlah = this.formValue.value.jumlah

    this.userService.updateData(this.produkModelObj.id, this.produkModelObj)
      .subscribe(res => {
        alert("Produk terupdate")
        let ref = document.getElementById('cancel')
        ref?.click()
        this.formValue.reset()
        this.getAllProduct()
      })
  }

}
