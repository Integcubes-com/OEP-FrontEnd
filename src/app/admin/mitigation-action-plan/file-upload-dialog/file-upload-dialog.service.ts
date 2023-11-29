import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumnetUpload, ReturnedDocumnet } from './file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadDialogService {
  private readonly saveFile = `${environment.apiUrl}/MitigationActionFileUploader/saveDocumnet`
  private readonly deleteFile = `${environment.apiUrl}/MitigationActionFileUploader/deleteDocument`
  private readonly downloadFileUrl = `${environment.apiUrl}/MitigationActionFileUploader/downloadFile`
  private readonly getFileList = `${environment.apiUrl}/MitigationActionFileUploader/getDocumnetList`
  constructor(private http: HttpClient) { }
  saveDocument(obj: DocumnetUpload, actionId: number, siteId: number, technologyId: number, userId: number): Observable<ReturnedDocumnet> {
    const formData = new FormData();
    formData.append('file', obj.file);
    formData.append('name', obj.name);
    formData.append('remarks', obj.remarks);
    formData.append('actionId', actionId.toString());
    formData.append('siteId', siteId.toString());
    formData.append('technologyId', technologyId.toString());
    formData.append('userId', userId.toString());
    return this.http.post<ReturnedDocumnet>(this.saveFile, formData)
  }
  deleteDocument(obj: ReturnedDocumnet): Observable<ReturnedDocumnet> {
    return this.http.post<ReturnedDocumnet>(this.deleteFile, obj)
  }
  downloadReport(url: string): Observable<any> {
    const encodedUrl = encodeURIComponent(url);
    return this.http.post(`${this.downloadFileUrl}/${encodedUrl}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  getAttachedFileList(userId: number, siteId:number, technologyId:number, actionId:number): Observable<ReturnedDocumnet[]> {
    let data = { userId,siteId,technologyId,actionId  }
    return this.http.post<ReturnedDocumnet[]>(this.getFileList, data)
  }
}
