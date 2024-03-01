import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumnetUpload, ReturnedDocumnet, ReturnedDocumnetTil } from './file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadDialogService {

  private readonly saveFile = `${environment.apiUrl}/UploadDocument/saveDocumnet`
  private readonly saveFileTil = `${environment.apiUrl}/UploadDocument/saveDocumnetTil`

  private readonly deleteFile = `${environment.apiUrl}/UploadDocument/deleteDocument`
  private readonly deleteFileTil = `${environment.apiUrl}/UploadDocument/deleteDocumentTil`
  private readonly downloadFileUrl= `${environment.apiUrl}/UploadDocument/downloadFile`
  private readonly getFileList = `${environment.apiUrl}/EndUserInsuranceTracker/getAttachedFiles`
  private readonly getFileListTil = `${environment.apiUrl}/EndUserTil/getAttachedFiles`

  constructor(private http: HttpClient) { }
  
  saveDocument(obj:DocumnetUpload, insurenceActionTrackerId:number, userId:number): Observable<ReturnedDocumnet> {
    const formData = new FormData();
    formData.append('file',obj.file);
    formData.append('name', obj.name);
    formData.append('remarks', obj.remarks);
    formData.append('insurenceActionTrackerId', insurenceActionTrackerId.toString());
    formData.append('userId', userId.toString());


    return this.http.post<ReturnedDocumnet>(this.saveFile, formData)
  }
  saveDocumentTil(obj:DocumnetUpload, tapId:number,equipId:number, userId:number): Observable<ReturnedDocumnetTil> {
    const formData = new FormData();
    formData.append('file',obj.file);
    formData.append('name', obj.name);
    formData.append('remarks', obj.remarks);
    formData.append('tapId', tapId.toString());
    formData.append('equipId', equipId.toString());
    formData.append('userId', userId.toString());


    return this.http.post<ReturnedDocumnetTil>(this.saveFileTil, formData)
  }
  deleteDocument(obj:ReturnedDocumnet): Observable<ReturnedDocumnet> {

    return this.http.post<ReturnedDocumnet>(this.deleteFile, obj)
  }
  deleteDocumentTil(obj:ReturnedDocumnetTil): Observable<ReturnedDocumnet> {

    return this.http.post<ReturnedDocumnet>(this.deleteFileTil, obj)
  }
  downloadReport(url: string): Observable<any> {
    const encodedUrl = encodeURIComponent(url);

    return this.http.post(`${this.downloadFileUrl}/${encodedUrl}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }


  getAttachedFileList(iatId:number , userId :number): Observable<ReturnedDocumnet[]> {
    let data = {iatId, userId}
    return this.http.post<ReturnedDocumnet[]>(this.getFileList, data)
  }
  getAttachedFileListTil(tapId:number , equipId:number, userId :number): Observable<ReturnedDocumnetTil[]> {
    let data = {tapId, equipId, userId}
    return this.http.post<ReturnedDocumnetTil[]>(this.getFileListTil, data)
  }
}
