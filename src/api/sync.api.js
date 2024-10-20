
import apiRequest from './request'

class _SyncAPI {
    async syncIssues() {
        return await apiRequest('/sync/start', {});
    }
}

const SyncAPI = new _SyncAPI()

export default SyncAPI;