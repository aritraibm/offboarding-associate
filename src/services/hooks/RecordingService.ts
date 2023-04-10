import axios from 'axios';

const BASE_URL = 'http://localhost:9094/recording';

class RecordingService {
  getRecordings() {
    return axios.get(BASE_URL + '/get-all-recordings');
  }

  createRecording(recording: any, headers: any) {
    return axios.post(BASE_URL + '/add-recording', recording, {
      headers: headers,
    });
  }

  getRecordingById(recordingId: any) {
    return axios.get(BASE_URL + '/' + recordingId);
  }

  updateRecording(recording: any, recordingId: any, headers: any) {
    return axios.put(BASE_URL + '/' + recordingId, recording, {
      headers: headers,
    });
  }

  deleteRecording(recordingId: any, headers: any) {
    return axios.delete(BASE_URL + '/' + recordingId, {
      headers: headers,
    });
  }
}

export default new RecordingService();
