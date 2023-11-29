import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumnetUpload, ReturnedDocumnet, ReturnedDocumnetTil } from './file-upload.model';
import { OT_FileList, OT_outageTracker } from '../track-outages/track-outages.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadDialogService {

  private readonly saveFile = `${environment.apiUrl}/OT_OutageTracker/uploadFile`

  private readonly deleteFileTil = `${environment.apiUrl}/OT_OutageTracker/deleteDocument`
  private readonly downloadFileUrl= `${environment.apiUrl}/OT_OutageTracker/downloadFile`
  private readonly getFileList = `${environment.apiUrl}/OT_OutageTracker/getFiles`

  constructor(private http: HttpClient) { }
  
  saveDocument(userId:number, action:OT_outageTracker,  uploadDoc:DocumnetUpload): Observable<ReturnedDocumnet> {
    const formData = new FormData();
    formData.append('report',uploadDoc.file);
    formData.append('fileName', uploadDoc.name);
    formData.append('remarks', uploadDoc.remarks);
    formData.append('equipmentId', action.equipmentId.toString());
    formData.append('phaseId', action.phaseId.toString());
    formData.append('phaseReadId', action.phaseReadId.toString());
    formData.append('outageDate', action.nextOutageDate.toString());
    formData.append('userId', userId.toString());


    return this.http.post<ReturnedDocumnet>(this.saveFile, formData)
  }
  getFileInfo(userId: number, action:OT_outageTracker): Observable<OT_FileList[]> {

    let data = { userId, action}
    return this.http.post<OT_FileList[]>(this.getFileList, data)
  }
  deleteDocumentTil(userId:number , fileId:number): Observable<ReturnedDocumnet> {
    let data = {userId, fileId}
    return this.http.post<ReturnedDocumnet>(this.deleteFileTil, data)
  }
  downloadReport(fileId:number): Observable<any> {

    return this.http.post(`${this.downloadFileUrl}/${fileId}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }



}
