
import {observable, computed, action} from "mobx";
import {request} from "../utils/axios"

export default class SystemState {
    @observable systemSettingList;

    constructor() {
        this.systemSettingList = [];
    }

    async getSystemSettingList() {
        const {data} = await request(
            {method: 'GET', url: '/api/system_setting/list'},
            {},
            {}
        );
        this.setSystemSettingList(data);
    }

    @action setSystemSettingList(data) {
        this.systemSettingList = data || [];
    }

    @computed get globalKeywordList() {
        const item = this.systemSettingList.find(item => item.key === 'globalKeywordList');
        if (item) {
            return item.value.split(',').filter(item => !!item);
        } else {
            return [];
        }
    }

}
